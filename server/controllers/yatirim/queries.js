const Islem = require("../../models/YatirimIslemlerModel");

exports.islemSorgula = async (req, res) => {
  try {
    const acikKayitlar = await Islem.find()
      .sort({ date: "desc" })
      .then((butceKalemi) => res.status(200).json(butceKalemi));
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası, Veri Alınamadı" });
  }
};

exports.acikPoziyonSorgu = async (kod) => {
  const queryObject = {
    action: "Alış",
    kod: kod,
    $or: [{ durum: "Açık" }, { durum: "Güncellendi" }],
  };
  let dataList = [];
  const codes = await Islem.find(queryObject)
    .sort({ date: "asc" })
    .then((code) => (dataList = code));
  return dataList;
};
