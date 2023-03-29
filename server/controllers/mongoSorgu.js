const ButceSchema = require("../models/ButceDataModel");

const title = "title";
const categoryA = "categoryA";
const categoryB = "categoryB";
const description = "description";

let queryObject = {
  type:"gider",categoryB: "Eğitim/Kitap"
};
let newObject = { $set: { categoryB: "Eğitim-Kitap" } };

exports.mongoUpdate = async (req, res) => {
  try {
    await ButceSchema.updateMany(queryObject, newObject);
    res.status(200).json({ message: "Bütçe Kalemleri Güncellendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.mongoSorgu = async (req, res) => {
  const butceKalemi = await ButceSchema.find(queryObject).then((butceKalemi) =>
    res.status(200).json(butceKalemi)
  );
};
