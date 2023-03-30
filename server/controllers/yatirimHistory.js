const YtHistory = require("../models/YatirimHistoryModel");

exports.tarihiKayitEkle = async (
  kod,
  adet,
  alim_tarihi,
  alim_fiyati,
  satim_tarihi,
  satim_fiyati,
  komisyon
) => {
  const tarihiKayit = YtHistory({
    kod,
    adet,
    alim_tarihi,
    alim_fiyati,
    satim_tarihi,
    satim_fiyati,
    komisyon,
  });

  try {
    await tarihiKayit.save();
  } catch (error) {
    res.status(500).json({ message: "Bağlantı Hatası, Kaydedilemedi" });
  }
};

exports.tarihiKayitSorgula = async (req, res) => {
  try {
    const tarihiKayitlar = await YtHistory.find()
      .sort({ satim_tarihi: 1 })
      .then((kayit) => res.status(200).json(kayit));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bağlantı Hatası, Tarihi Kayıtlar Alınamadı" });
  }
};
