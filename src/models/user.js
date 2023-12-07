// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique:true },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  email_verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
