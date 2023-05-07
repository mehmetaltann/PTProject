const Category = require("../../models/ButceCategoryModel");

exports.categorySorgula = async (req, res) => {
  try {
    await Category.find().then((kayit) => res.status(200).json(kayit));
  } catch (error) {
    res.status(500).json({ message: "Bağlantı Hatası, Kategoriler Alınamadı" });
  }
};

exports.categoryEkle = async (req, res) => {
  const { type, categoryA, categoryB } = req.body;
  const category = Category({
    type,
    categoryA,
    categoryB,
  });

  try {
    await category.save();
    res.status(200).json({ message: "Kategori Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.categorySil = async (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "Kategori Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};
