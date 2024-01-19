const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOption");

// const userSchema = new mongoose.UserSchema({
const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "🗒",
  },
  title: {
    type: String,
    default: "New Memo",
  },
  description: {
    type: String,
    default: "Please feel free to write down anything you want",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo;
