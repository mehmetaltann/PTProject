const mongoose = require("mongoose");

const YtHistory = new mongoose.Schema(
  {
    adet: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    alim_islemId: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
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
