const mongoose = require("mongoose");

const YtHistory = new mongoose.Schema(
  {
    kod: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    adet: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    alim_tarihi: {
      type: Date,
      required: true,
      trim: true,
    },
    alim_fiyati: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    satim_tarihi: {
      type: Date,
      required: true,
      trim: true,
    },
    satim_fiyati: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    komisyon: {
      type: Number,
      trim: true,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YtHistory", YtHistory);
