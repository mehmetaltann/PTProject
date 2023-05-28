const mongoose = require("mongoose");

const InvPortfolioSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    maxLength: 7,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 40,
  },
});

module.exports = mongoose.model("portfolio", InvPortfolioSchema);
