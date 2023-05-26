const BudgetItemSchema = require("../../models/BudgetItemModel");

const queryObject = {
  type: "gider",
};
const newObject = { $set: { type: "Gider" } };

exports.mongoUpdate = async (req, res) => {
  try {
    await BudgetItemSchema.updateMany(queryObject, newObject);
    res.status(200).json({ message: "Bütçe Kalemleri Güncellendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.mongoQuery = async (req, res) => {
  try {
    const response = await BudgetItemSchema.find(queryObject);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
