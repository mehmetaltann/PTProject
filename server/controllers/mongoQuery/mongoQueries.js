const BudgetItemSchema = require("../../models/BudgetItemModel");
const InvestmentSchema = require("../../models/InvestmentModel");

const queryObject = {
  portfolio: { $regex: "Bireysel Emekl" },
};
const newObject = { $set: { portfolio: "Bireysel Emeklilik Fonları" } };

exports.mongoUpdate = async (req, res) => {
  try {
    await InvestmentSchema.updateMany(queryObject, newObject);
    res.status(200).json({ message: "Bütçe Kalemleri Güncellendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.mongoQuery = async (req, res) => {
  try {
    const response = await InvestmentSchema.find(queryObject);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
