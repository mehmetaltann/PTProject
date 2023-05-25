const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    piece: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    commission: {
      type: Number,
      trim: true,
      maxLength: 20,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
      required: true,
      maxLength: 40,
    },
    state: {
      type: String,
      trim: true,
      default: "Açık",
      maxLength: 7,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("investments", InvestmentSchema);
