const YtHistory = require("../../models/YatirimHistoryModel");

exports.gecmisIslemEkle = async (
  kod,
  adet,
  alim_islemId,
  alim_tarihi,
  alim_fiyati,
  satim_tarihi,
  satim_fiyati,
  komisyon
) => {
  const gecmisIslem = YtHistory({
    kod,
    adet,
    alim_islemId,
    alim_tarihi,
    alim_fiyati,
    satim_tarihi,
    satim_fiyati,
    komisyon,
  });
  await gecmisIslem.save();
};

exports.gecmisIslemSorgula = async (req, res) => {
  try {
    const gecmisIslemler = await YtHistory.find()
      .sort({ satim_tarihi: 1 })
      .then((kayit) => res.status(200).json(kayit));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bağlantı Hatası, Tarihi Kayıtlar Alınamadı" });
  }
};
