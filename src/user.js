const mongoose = require("mongoose");

// const userSchema = new mongoose.UserSchema({
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
