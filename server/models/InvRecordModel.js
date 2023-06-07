const mongoose = require("mongoose");

const InvRecordSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    portfolio: {
      type: String,
      trim: true,
      required: true,
      maxLength: 40,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    purchasePrice: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    purchaseDate: {
      type: Date,
      required: true,
      trim: true,
    },
    salePrice: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    saleDate: {
      type: Date,
      required: true,
      trim: true,
    },
    saleCommission: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("record", InvRecordSchema);
