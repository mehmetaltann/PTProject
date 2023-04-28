const Islem = require("../../models/YatirimIslemlerModel");
const { portfolioDurumQuery } = require("../../utils/queries");

exports.portfolioDurum = async (req, res) => {
  try {
    const acikKayitlar = await Islem.aggregate(portfolioDurumQuery).then(
      (butceKalemi) => res.status(200).json(butceKalemi)
    );
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası, Veri Alınamadı" });
  }
};
