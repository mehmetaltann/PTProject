const ButceSchema = require("../../models/ButceDataModel");

const queryObject = {
  type: "gider",
};
const newObject = { $set: { type: "Gider" } };

exports.mongoUpdate = async (req, res) => {
  try {
    await ButceSchema.updateMany(queryObject, newObject);
    res.status(200).json({ message: "Bütçe Kalemleri Güncellendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.mongoSorgu = async (req, res) => {
  try {
    const response = await ButceSchema.find(queryObject);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
