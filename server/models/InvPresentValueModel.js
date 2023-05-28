const mongoose = require("mongoose");

const InvPresentValueSchema = new mongoose.Schema(
  {
    portfolio: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    price: {
      type: Number,
      trim: true,
      maxLength: 20,
      default: 0,
    },
    title: {
      type: String,
      trim: true,
      maxLength: 250,
    },
    category: {
      type: String,
      trim: true,
      maxLength: 150,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("presentvalue", InvPresentValueSchema);
