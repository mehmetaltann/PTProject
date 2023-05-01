exports.gecmisIslemQuery = [
  {
    $lookup: {
      let: { userObjId: { $toObjectId: "$alim_islemId" } },
      from: "islems",
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } },
        { $project: { kod: 1, fiyat: 1, date: 1, portfoy_ismi: 1 } },
      ],
      as: "alim",
    },
  },
  {
    $unwind: "$alim",
  },
  {
    $lookup: {
      let: { userObjId: { $toObjectId: "$satim_islemId" } },
      from: "islems",
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$userObjId"] } } },
        { $project: { fiyat: 1, date: 1, komisyon: 1 } },
      ],
      as: "satim",
    },
  },
  {
    $unwind: "$satim",
  },
  {
    $project: {
      _id: 0,
      id: "$_id",
      portfoy: "$alim.portfoy_ismi",
      kod: "$alim.kod",
      adet: { $round: ["$adet", 4] },
      alis_tarihi: "$alim.date",
      alis_fiyat: { $round: ["$alim.fiyat", 2] },
      satis_tarihi: "$satim.date",
      satis_fiyat: { $round: ["$satim.fiyat", 2] },
      komisyon: "$satim.komisyon",
      kar_zarar: {
        $round: [
          {
            $multiply: [
              { $subtract: ["$alim.fiyat", "$satim.fiyat"] },
              "$adet",
            ],
          },
          2,
        ],
      },
      kar_zarar_orani: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  { $abs: { $subtract: ["$alim.fiyat", "$satim.fiyat"] } },
                  "$alim.fiyat",
                ],
              },
              100,
            ],
          },
          2,
        ],
      },
      gun_farki: {
        $dateDiff: {
          startDate: "$alim.date",
          endDate: "$satim.date",
          unit: "day",
        },
      },
    },
  },
];

exports.portfolioDurumQuery = [
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
      portfoy_ismi: "$portfoy_ismi",
    },
  },
];

exports.tumIslemlerQuery = [
  [
    { $sort: { date: -1 } },
    {
      $project: {
        _id: 0,
        id: "$_id",
        islem: "$action",
        kod: 1,
        adet: 1,
        fiyat: 1,
        komisyon: 1,
        tarih: "$date",
        portfoy: "$portfoy_ismi",
        durum: 1,
      },
    },
  ],
];
