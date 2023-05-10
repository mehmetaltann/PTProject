const YtHistory = require("../../models/YatirimHistoryModel");
const { dbFindAggregate, dbDeleteOne } = require("../dbTransections");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  birthday,
} = require("../../utils/helpFunctions");

const aggQuery = (creatDate) => {
  const gecmisIslemQuery = [
    {
      $match: {
        createdAt: {
          $gte: creatDate,
        },
      },
    },
    {
      $lookup: {
        let: { userObjId: { $toObjectId: "$satim_islemId" } },
        from: "islems",
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userObjId"] },
            },
          },
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
        portfoy: "$portfoy_ismi",
        kod: 1,
        adet: { $round: ["$adet", 4] },
        alis_tarihi: 1,
        alis_fiyat: { $round: ["$alis_fiyati", 2] },
        satis_tarihi: "$satim.date",
        satis_fiyat: { $round: ["$satim.fiyat", 2] },
        komisyon: "$satim.komisyon",
        kar_zarar: {
          $round: [
            {
              $multiply: [
                { $subtract: ["$alis_fiyati", "$satim.fiyat"] },
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
                    { $abs: { $subtract: ["$alis_fiyati", "$satim.fiyat"] } },
                    "$alis_fiyati",
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
            startDate: "$alis_tarihi",
            endDate: "$satim.date",
            unit: "day",
          },
        },
      },
    },
  ];
  return gecmisIslemQuery;
};

exports.gecmisIslemSorgula = async (req, res) => {
  const activeDate = req.params.date;
  const dataQuery = (zaman) => {
    dbFindAggregate(YtHistory, aggQuery(zaman), res);
  };

  if (activeDate == 1) {
    dataQuery(thisMonthFirstDay);
  } else if (activeDate == 2) {
    dataQuery(prevThreeMonthFirstDay);
  } else if (activeDate == 3) {
    dataQuery(prevSixMonthFirstDay);
  } else if (activeDate == 4) {
    dataQuery(prevYearFirstDay);
  } else if (activeDate == 5) {
    dataQuery(prevThreeYearFirstDay);
  } else if (activeDate == 0) {
    dataQuery(birthday);
  }
};

exports.gecmisIslemEkle = async (
  adet,
  kod,
  alis_fiyati,
  alis_tarihi,
  portfoy_ismi,
  satim_islemId
) => {
  const gecmisIslem = YtHistory({
    adet,
    kod,
    alis_fiyati,
    alis_tarihi,
    portfoy_ismi,
    satim_islemId,
  });

  try {
    await gecmisIslem.save();
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.gecmisIslemSil = async (req, res) => {
  dbDeleteOne(YtHistory, req.params.id, "Geçmiş Silindi", res);
};
