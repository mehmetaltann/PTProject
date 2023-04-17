const Islem = require("../../models/YatirimIslemlerModel");

const query = [
  {
    $match: {
      durum: "Açık",
    },
  },
  {
    $group: {
      _id: "$kod",
      toplam_maliyet: {
        $sum: {
          $multiply: ["$fiyat", "$adet"],
        },
      },
      toplam_adet: {
        $sum: "$adet",
      },
    },
  },
  {
    $project: {
      adet: "$toplam_adet",
      ortalama_fiyat: {
        $divide: ["$toplam_maliyet", "$toplam_adet"],
      },
      toplam_maliyet: "$toplam_maliyet",
      portfoy_ismi : "$portfoy_ismi"
    },
  },
];

exports.portfolioDurum = async (req, res) => {
  try {
    const acikKayitlar = await Islem.aggregate(query).then((butceKalemi) =>
      res.status(200).json(butceKalemi)
    );
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası, Veri Alınamadı" });
  }
};
