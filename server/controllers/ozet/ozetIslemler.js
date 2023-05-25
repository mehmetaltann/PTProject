const Islem = require("../../models/YatirimIslemlerModel");

const guncelDurumQuery = [
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
    $lookup: {
      from: "gunceldatas",
      localField: "_id.k",
      foreignField: "kod",
      as: "guncel",
    },
  },
  {
    $unwind: "$guncel",
  },
  {
    $project: {
      id: "$guncel._id",
      kod: "$_id.k",
      _id: 0,
      portfoy: "$_id.p",
      title: "$guncel.title",
      category: "$guncel.category",
      adet: "$toplam_adet",
      gnc_fiyat: "$guncel.price",
      ort_fiyat: { $divide: ["$toplam_maliyet", "$toplam_adet"] },
      toplam_tutar: { $multiply: ["$guncel.price", "$toplam_adet"] },
      toplam_maliyet: { $round: ["$toplam_maliyet", 4] },
      toplam_kar: {
        $subtract: [
          { $multiply: ["$guncel.price", "$toplam_adet"] },
          "$toplam_maliyet",
        ],
      },
      kar_yuzdesi: {
        $multiply: [
          {
            $divide: [
              {
                $subtract: [
                  { $multiply: ["$guncel.price", "$toplam_adet"] },
                  "$toplam_maliyet",
                ],
              },
              "$toplam_maliyet",
            ],
          },
          100,
        ],
      },
    },
  },
];

const guncelDurumArkaPlan = async () => {
  try {
    return await Islem.aggregate(guncelDurumQuery);
  } catch (error) {
    return console.log(error);
  }
};
