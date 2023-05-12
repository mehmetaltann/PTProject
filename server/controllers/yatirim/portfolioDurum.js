const Islem = require("../../models/YatirimIslemlerModel");
const { dbFindAggregate} = require("../dbTransections");

const portfolioDurumQuery = [
  {
    $match: {
      $or: [{ durum: "Açık" }, { durum: "Güncellendi" }],
    },
  },
  {
    $group: {
      _id: { k: "$kod", p: "$portfoy_ismi" },
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
      kod: "$_id.k",
      portfoy_ismi: "$_id.p",
      _id: 0,
      adet: "$toplam_adet",
      ortalama_fiyat: {
        $divide: ["$toplam_maliyet", "$toplam_adet"],
      },
      toplam_maliyet: { $round: ["$toplam_maliyet", 3] },
    },
  },
];

exports.portfolioDurum = async (req, res) => {
  dbFindAggregate(Islem, portfolioDurumQuery, res);
};

