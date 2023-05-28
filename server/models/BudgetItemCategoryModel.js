const mongoose = require("mongoose");

const BudgetItemCategorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("budgetcategory", BudgetItemCategorySchema);
