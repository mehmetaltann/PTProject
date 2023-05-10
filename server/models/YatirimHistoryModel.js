const mongoose = require("mongoose");

const YtHistory = new mongoose.Schema(
  {
    adet: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    kod: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    alis_fiyati: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    alis_tarihi: {
      type: Date,
      required: true,
      trim: true,
    },
    portfoy_ismi: {
      type: String,
      trim: true,
      required: true,
      maxLength: 40,
    },
    satim_islemId: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YtHistory", YtHistory);
