const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    maxLength: 6,
  },
  categoryA: {
    type: String,
    required: true,
    trim: true,
    maxLength: 40,
  },
  categoryB: {
    type: String,
    required: true,
    trim: true,
    maxLength: 40,
  },
});

module.exports = mongoose.model("Category", Category);
