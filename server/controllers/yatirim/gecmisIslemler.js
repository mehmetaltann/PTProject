const YtHistory = require("../../models/YatirimHistoryModel");
const { gecmisIslemQuery } = require("../../utils/queries");

exports.gecmisIslemEkle = async (adet, satim_islemId, alim_islemId) => {
  const gecmisIslem = YtHistory({
    adet,
    alim_islemId,
    satim_islemId,
  });
  await gecmisIslem.save();
};

exports.gecmisIslemSorgula = async (req, res) => {
  try {
    const gecmisIslemler = await YtHistory.aggregate(gecmisIslemQuery).then(
      (kayit) => res.status(200).json(kayit)
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bağlantı Hatası, Tarihi Kayıtlar Alınamadı" });
  }
};
