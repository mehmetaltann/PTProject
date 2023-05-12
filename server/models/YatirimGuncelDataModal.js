const mongoose = require("mongoose");

const GuncelData = new mongoose.Schema(
  {
    portfoy: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    kod: {
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
    fiyat: {
      type: Number,
      trim: true,
      maxLength: 20,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GuncelData", GuncelData);
