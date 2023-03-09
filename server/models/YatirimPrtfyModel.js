const mongoose = require("mongoose");

const YatirimSchema = new mongoose.Schema(
  {
    kod: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5,
    },
    tip: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
    },
    adet: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    alimfiyati: {
      type: Number,
      required: true,
      trim: true,
    },
    alimtarihi: {
      type: Date,
      required: true,
      trim: true,
    },
    satimtarihi: {
      type: Date,
      trim: true,
    },
    aciklama: {
      type: String,
      default: "",
      trim: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Yatirim Portfoy", YatirimSchema);
