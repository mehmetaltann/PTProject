const YtHistory = require("../../models/YatirimHistoryModel");

exports.gecmisIslemEkle = async (
  kod,
  adet,
  alim_islemId,
  satim_tarihi,
  satim_fiyati,
  komisyon
) => {
  const gecmisIslem = YtHistory({
    kod,
    adet,
    alim_islemId,
    satim_tarihi,
    satim_fiyati,
    komisyon,
  });
  await gecmisIslem.save();
};

exports.gecmisIslemSorgula = async (req, res) => {
  try {
    const gecmisIslemler = await YtHistory.aggregate([
      {
        $lookup: {
          let: { userObjId: { $toObjectId: "$alim_islemId" } },
          from: "islems",
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } }],
          as: "alim_bilgi",
        },
      },
    ]).then((kayit) => res.status(200).json(kayit));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bağlantı Hatası, Tarihi Kayıtlar Alınamadı" });
  }
};
