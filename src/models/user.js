// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, unique: false },
  middle_name: { type: String, unique: false },
  last_name: { type: String, unique: false },
  birth_date: { type: Date, unique: false },
  location: { type: String, unique: false },
  language: { type: String, unique: false },
  email: { type: String, unique: true },
  email_verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
