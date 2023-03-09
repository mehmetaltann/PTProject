const GelirSchema = require("../models/GelirModel");

exports.gelirEkle = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const gelir = GelirSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validation
    if (!title || !category || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Boş Alan Bırakmayınız Bayım :)" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Rakamı Düzgün Giriniz :)" });
    }
    //validation
    await gelir.save();
    res.status(200).json({ message: "Gelir Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.gelirSorgula = async (req, res) => {
  try {
    const gelir = await GelirSchema.find().sort({ createdAt: -1 });
    res.status(200).json(gelir);
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.gelirSil = async (req, res) => {
  const { id } = req.params;
  GelirSchema.findByIdAndDelete(id)
    .then((gelir) => {
      res.status(200).json({ message: "Gelir Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    })
};
