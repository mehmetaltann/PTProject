const YtHistory = require("../../models/YatirimHistoryModel");
const { dbFindAggregate, dbDeleteOne } = require("../dbTransections");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../../utils/helpFunctions");

const addDateQuery = (date = null) => {
  const gecmisIslemQuery = [
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
  return gecmisIslemQuery;
};

exports.gecmisIslemSorgula = async (req, res) => {
  const activeDate = req.params.date;
  const dataQuery = (query) => {
    dbFindAggregate(YtHistory, query, res);
  };

  if (activeDate == 1) {
    dataQuery(addDateQuery({ $createdAt: { $gte: thisMonthFirstDay } }));
  } else if (activeDate == 2) {
    dataQuery(addDateQuery({ $createdAt: { $gte: prevThreeMonthFirstDay } }));
  } else if (activeDate == 3) {
    dataQuery(addDateQuery({ $createdAt: { $gte: prevSixMonthFirstDay } }));
  } else if (activeDate == 4) {
    dataQuery(addDateQuery({ $createdAt: { $gte: prevYearFirstDay } }));
  } else if (activeDate == 5) {
    dataQuery(addDateQuery({ $createdAt: { $gte: prevThreeYearFirstDay } }));
  } else if (activeDate == 0) {
    dataQuery(addDateQuery());
  }
};

exports.gecmisIslemEkle = async (adet, satim_islemId, alim_islemId) => {
  const gecmisIslem = YtHistory({
    adet,
    alim_islemId,
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
