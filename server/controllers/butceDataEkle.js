const ButceSchema = require("../models/ButceDataModel");

exports.butceDataEkle = async (req, res) => {
  const { title, amount, categoryA, categoryB, description, date } = req.body;
  const tip = req.params.type;
  const butceData = ButceSchema({
    title,
    amount,
    type:tip,
    categoryA,
    categoryB,
    description,
    date,
  });

  try {
    //validation
    if (!title || !categoryA || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Boş Alan Bırakmayınız Bayım :)" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Rakamı Düzgün Giriniz :)" });
    }
    //validation
    await butceData.save();
    res.status(200).json({ message: "Bütçe Kalemi Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
