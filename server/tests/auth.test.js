const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cache = require('memory-cache');

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('memory-cache');

const User = require('../models/user');
const authRoutes = require('../routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Login Authentication System - Core Requirements', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        cache.clear();
    });

    describe('Basic Validation', () => {
        test('should return 400 if email, password, or IP is missing', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Email, password, and IP are required.');
        });
    });

    describe('Requirement 1: User-Level Suspension (5 attempts → 15min)', () => {
        test('should suspend user after 5 failed attempts', async () => {
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 4,
                lastFailedLogin: null,
                isSuspendedUntil: null,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(0);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toContain('temporarily suspended for 15 minutes');
            expect(mockUser.failedAttempts).toBe(5);
            expect(mockUser.isSuspendedUntil).toBeGreaterThan(Date.now());
            expect(mockUser.save).toHaveBeenCalled();
        });

        test('should block suspended user from logging in', async () => {
            const suspensionTime = Date.now() + (10 * 60 * 1000);
            const mockUser = {
                _id: 'user123',
                email: 'suspended@example.com',
                password: 'hashedpassword',
                failedAttempts: 5,
                isSuspendedUntil: suspensionTime
            };

            cache.get.mockReturnValue(0);
            User.findOne.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'suspended@example.com',
                    password: 'correctpassword',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(423);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Account temporarily suspended');
            expect(response.body.error).toContain('10 minutes');
        });

        test('should reset failed attempts on successful login', async () => {
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 3,
                lastFailedLogin: Date.now(),
                isSuspendedUntil: null,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(0);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock-jwt-token');

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'correctpassword',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(200);
            expect(mockUser.failedAttempts).toBe(0);
            expect(mockUser.lastFailedLogin).toBe(null);
            expect(mockUser.isSuspendedUntil).toBe(null);
        });

        test('should show remaining attempts before suspension', async () => {
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 2,
                lastFailedLogin: null,
                isSuspendedUntil: null,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(0);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toContain('You have 2 attempt(s) remaining');
            expect(mockUser.failedAttempts).toBe(3);
        });
    });

    describe('Requirement 2: IP-Level Blocking (100 attempts → 15min)', () => {
        test('should block IP after 100 failed attempts', async () => {
            const testIP = '192.168.1.100';


            cache.get.mockReturnValue(100);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    ip: testIP
                });

            expect(response.status).toBe(429);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('IP temporarily blocked due to excessive failed login attempts. Please try again after 15 minutes.');
        });

        test('should increment IP attempts for failed login', async () => {
            const testIP = '192.168.1.1';
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 0,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(50);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                    ip: testIP
                });

            expect(response.status).toBe(401);
            expect(cache.put).toHaveBeenCalledWith(testIP, 51, 15 * 60 * 1000);
        });

        test('should increment IP attempts for non-existent user', async () => {
            const testIP = '192.168.1.1';

            cache.get.mockReturnValue(5);
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123',
                    ip: testIP
                });

            expect(response.status).toBe(401);
            expect(cache.put).toHaveBeenCalledWith(testIP, 6, 15 * 60 * 1000);
        });

        test('should clear IP attempts on successful login', async () => {
            const testIP = '192.168.1.1';
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 0,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(10);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock-jwt-token');

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'correctpassword',
                    ip: testIP
                });

            expect(response.status).toBe(200);
            expect(cache.del).toHaveBeenCalledWith(testIP);
        });
    });

    describe('Successful Login Flow', () => {
        test('should return JWT token and user data on successful login', async () => {
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                role: 'user',
                name: 'Test User',
                failedAttempts: 0,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(0);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock-jwt-token');

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'correctpassword',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.token).toBe('mock-jwt-token');
            expect(response.body.data.user).toEqual({
                id: 'user123',
                email: 'test@example.com',
                role: 'user',
                name: 'Test User'
            });
        });
    });

    describe('Integration: Both Requirements Working Together', () => {
        test('should handle IP blocking and user suspension simultaneously', async () => {
            const testIP = '192.168.1.1';
            const mockUser = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'hashedpassword',
                failedAttempts: 4,
                save: jest.fn().mockResolvedValue(true)
            };

            cache.get.mockReturnValue(99);
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                    ip: testIP
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toContain('temporarily suspended for 15 minutes');
            expect(cache.put).toHaveBeenCalledWith(testIP, 100, 15 * 60 * 1000);
            expect(mockUser.failedAttempts).toBe(5);
        });
    });

    describe('Error Handling', () => {
        test('should handle database errors gracefully', async () => {
            cache.get.mockReturnValue(0);
            User.findOne.mockRejectedValue(new Error('Database connection failed'));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    ip: '192.168.1.1'
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
        });
    });
});