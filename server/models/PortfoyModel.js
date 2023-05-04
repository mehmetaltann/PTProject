const mongoose = require("mongoose");

const Portfoy = new mongoose.Schema({
  kod: {
    type: String,
    required: true,
    trim: true,
    maxLength: 7,
  },
  isim: {
    type: String,
    required: true,
    trim: true,
    maxLength: 40,
  },
});

module.exports = mongoose.model("Portfoy", Portfoy);
