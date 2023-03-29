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
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
