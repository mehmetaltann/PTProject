const BudgetItemCategorySchema = require("../../models/BudgetItemCategoryModel");
const { dbFind, dbFindByIdAndDelete, dbSave } = require("../dbQueries");

exports.budgetItemCategoryQuery = async (req, res) => {
  try {
    const data = await dbFind(BudgetItemCategorySchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kategoriler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.budgetItemCategoryAdd = async (req, res) => {
  const { type, categoryA, categoryB } = req.body;
  const category = BudgetItemCategorySchema({
    type,
    categoryA,
    categoryB,
  });
  try {
    await dbSave(category);
    res.status(200).json({ message: "Kategori Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kategori Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.budgetItemCategoryDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(BudgetItemCategorySchema, req.params.id);
    res.status(200).json({ message: "Kategori Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kategori Silinemedi, Server Bağlantı Hatası" });
  }
};
