const Islem = require("../../models/YatirimIslemlerModel");
const { dbFindAggregate } = require("../dbTransections");

exports.portfolioDurumQuery = [
  {
    $match: {
      $or: [{ durum: "Açık" }, { durum: "Güncellendi" }],
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
      kod: "$kod",
      ortalama_fiyat: {
        $divide: ["$toplam_maliyet", "$toplam_adet"],
      },
      toplam_maliyet: { $round: ["$toplam_maliyet", 3] },
      portfoy_ismi: "$portfoy_ismi",
    },
  },
];

exports.portfolioDurum = async (req, res) => {
  dbFindAggregate(Islem, portfolioDurumQuery, res);
};
