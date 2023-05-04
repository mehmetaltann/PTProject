const mongoose = require("mongoose");

const ButceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    type: {
      type: String,
      default: "",
      trim: true,
      maxLength: 10,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    categoryA: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    categoryB: {
      type: String,
      default: "",
      trim: true,
      maxLength: 30,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Butce", ButceSchema);