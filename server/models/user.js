const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
  lastFailedLogin: { type: Date, default: null },
  isSuspendedUntil: { type: Date, default: null }
});

module.exports = mongoose.model('User', userSchema);
