const mongoose = require("mongoose");

const UserSchema = new mongoose.UserSchema({
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

const User = mongoose.mode("User", UserSchema);
module.exports = User;
