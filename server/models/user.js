const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savings: {
    type: Number,
    default: 0, // Initial savings is set to 0
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
