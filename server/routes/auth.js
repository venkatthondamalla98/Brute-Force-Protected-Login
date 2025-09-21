const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cache = require('memory-cache');

const router = express.Router();


const MAX_FAILED_ATTEMPTS = 5;
const MAX_FAILED_ATTEMPTS_IP = 100;
const SUSPENSION_DURATION = 15 * 60 * 1000;
const LOCKOUT_DURATION_IP = 15 * 60 * 1000;


const sendSuccess = (res, status, message, data = null) => {
  const response = {
    status: status,
    success: true,
    message
  };
  if (data) response.data = data;
  return res.status(status).json(response);
};

const sendError = (res, status, message, details = null) => {
  const response = {
    status: status,
    success: false,
    error: message
  };
  if (details) response.details = details;
  return res.status(status).json(response);
};


router.post('/login', async (req, res) => {
  try {
    const { email, password, ip } = req.body;

    console.log("Login request received:", { email, ip });

    if (!email || !password || !ip) {
      return sendError(res, 400, "Email, password, and IP are required.");
    }

    console.log(`[LOGIN ATTEMPT] Email: ${email}, IP: ${ip}`);


    const ipAttempts = cache.get(ip) || 0;
    if (ipAttempts >= MAX_FAILED_ATTEMPTS_IP) {
      console.warn(`[BLOCKED IP] ${ip} exceeded max attempts.`);
      return sendError(res, 429, "IP temporarily blocked due to excessive failed login attempts. Please try again after 15 minutes.");
    }


    const user = await User.findOne({ email });
    console.log("User lookup result:", user ? "Found" : "Not found");

    if (!user) {

      cache.put(ip, ipAttempts + 1, LOCKOUT_DURATION_IP);
      console.log(`[INVALID USER] ${email} - IP attempts now: ${ipAttempts + 1}`);
      return sendError(res, 401, "Invalid email or password. Please check your credentials.");
    }


    if (user.isSuspendedUntil && user.isSuspendedUntil > Date.now()) {
      const waitMinutes = Math.ceil((user.isSuspendedUntil - Date.now()) / (60 * 1000));
      console.warn(`[SUSPENDED USER] ${email} locked for ${waitMinutes} minutes.`);
      return sendError(res, 423, `Account temporarily suspended due to multiple failed login attempts. Please try again in ${waitMinutes} minutes.`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedAttempts += 1;
      user.lastFailedLogin = Date.now();

      let suspensionMessage = "";
      if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        user.isSuspendedUntil = Date.now() + SUSPENSION_DURATION;
        suspensionMessage = " Your account has been temporarily suspended for 15 minutes due to multiple failed attempts.";
        console.warn(`[USER SUSPENDED] ${email} for 15 minutes after ${user.failedAttempts} failed attempts.`);
      }

      await user.save();


      cache.put(ip, ipAttempts + 1, LOCKOUT_DURATION_IP);

      const remainingAttempts = MAX_FAILED_ATTEMPTS - user.failedAttempts;
      let errorMessage = "Invalid email or password.";

      if (suspensionMessage) {
        errorMessage += suspensionMessage;
      } else if (remainingAttempts > 0) {
        errorMessage += ` You have ${remainingAttempts} attempt(s) remaining before account suspension.`;
      }

      console.log(`[FAILED LOGIN] ${email} - Attempts: ${user.failedAttempts}/${MAX_FAILED_ATTEMPTS}, IP attempts: ${ipAttempts + 1}`);
      return sendError(res, 401, errorMessage);
    }

    const hadFailedAttempts = user.failedAttempts > 0;
    user.failedAttempts = 0;
    user.lastFailedLogin = null;
    user.isSuspendedUntil = null;
    await user.save();


    cache.del(ip);

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || 'user'
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    console.log(`[LOGIN SUCCESS] ${email} - Token generated successfully`);

    const successMessage = hadFailedAttempts
      ? "Login successful! Your account security status has been reset."
      : "Login successful! Welcome back.";

    return sendSuccess(res, 200, successMessage, {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || 'user',
        name: user.name || user.username
      }
    });

  } catch (error) {
    console.error("[LOGIN ERROR]", error.message, error.stack);

    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = isDevelopment
      ? `Internal server error: ${error.message}`
      : "An unexpected error occurred. Please try again later.";

    return sendError(res, 500, errorMessage, isDevelopment ? { stack: error.stack } : null);
  }
});

module.exports = router;