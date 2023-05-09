const Category = require("../../models/ButceCategoryModel");
const { dbDeleteOne, dbSaveOne, dbFind } = require("../dbTransections");

exports.categorySorgula = async (req, res) => {
  dbFind(Category, undefined, undefined, res);
};

exports.categoryEkle = async (req, res) => {
  const { type, categoryA, categoryB } = req.body;
  const category = Category({
    type,
    categoryA,
    categoryB,
  });
  dbSaveOne(category, "Kategori Eklendi", res);
};

exports.categorySil = async (req, res) => {
  dbDeleteOne(Category, req.params.id, "Kategori Silindi", res);
};
