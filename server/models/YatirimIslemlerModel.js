const mongoose = require("mongoose");

const Islem = new mongoose.Schema(
  {
    action: {
      /* Alış - Satış */
      type: String,
      required: true,
      trim: true,
      maxLength: 7,
    },
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
    fiyat: {
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
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    portfoy_ismi: {
      type: String,
      trim: true,
      required: true,
      maxLength: 20,
    },
    durum: {
      type: String,
      trim: true,
      default: "Açık",
      maxLength: 7,
    },
    kapanis_date: {
      type: Date,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Islem", Islem);
