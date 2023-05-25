const mongoose = require("mongoose");

const OzetSchema = new mongoose.Schema({
  yatirim: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 20,
  },
  banka: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 20,
  },
  gelir: { type: Number, required: true, trim: true, maxLength: 20 },
  gider: { type: Number, required: true, trim: true, maxLength: 20 },
});

module.exports = mongoose.model("Ozet", OzetSchema);
