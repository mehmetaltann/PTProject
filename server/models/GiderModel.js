const mongoose = require("mongoose");

const GiderSchema = new mongoose.Schema(
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
      default: "Gider",
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
      maxLength: 25,
    },
    categoryB: {
      type: String,
      default: "",
      trim: true,
      maxLength: 25,
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

module.exports = mongoose.model("Gider", GiderSchema);
