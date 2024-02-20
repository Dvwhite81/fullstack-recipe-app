const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  token: {
    type: String,
  },
  recipes: [],
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;
