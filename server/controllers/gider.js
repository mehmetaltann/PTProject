const GiderSchema = require("../models/GiderModel");

exports.giderEkle = async (req, res) => {
  const { title, amount, categoryA, categoryB, description, date } = req.body;
  const gider = GiderSchema({
    title,
    amount,
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
    await gider.save();
    res.status(200).json({ message: "Gider Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.giderSorgula = async (req, res) => {
  try {
    const gider = await GiderSchema.find().sort({ createdAt: -1 });
    res.status(200).json(gider);
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.giderSil = async (req, res) => {
  const { id } = req.params;
  GiderSchema.findByIdAndDelete(id)
    .then((gider) => {
      res.status(200).json({ message: "Gider Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};
