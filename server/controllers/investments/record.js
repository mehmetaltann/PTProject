const InvRecordSchema = require("../../models/InvRecordModel");
const {
  dbFindByIdAndDelete,
  dbSave,
  dbFindAggregate,
} = require("../dbQueries");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  birthday,
} = require("../../utils/helpFunctions");

const aggQuery = (creatDate) => {
  const recordQ = [
    {
      $match: {
        createdAt: {
          $gte: creatDate,
        },
      },
    },
    {
      $project: {
        _id: 1,
        code: 1,
        portfolio: 1,
        number: 1,
        purchaseDate: 1,
        purchasePrice: 1,
        saleDate: 1,
        salePrice: 1,
        saleCommission: 1,
        plStatus: {
          $round: [
            {
              $multiply: [
                { $subtract: ["$purchasePrice", "$salePrice"] },
                "$number",
              ],
            },
            2,
          ],
        },
        plPercentage: {
          $multiply: [
            {
              $divide: [
                { $abs: { $subtract: ["$purchasePrice", "$salePrice"] } },
                "$purchasePrice",
              ],
            },
            100,
          ],
        },
        dateDiff: {
          $dateDiff: {
            startDate: "$purchaseDate",
            endDate: "$saleDate",
            unit: "day",
          },
        },
      },
    },
  ];
  return recordQ;
};

exports.recordQuery = async (req, res) => {
  const activeDate = req.params.date;
  const duration = (date) => {
    if (date == 1) {
      return thisMonthFirstDay;
    } else if (date == 2) {
      return prevThreeMonthFirstDay;
    } else if (date == 3) {
      return prevSixMonthFirstDay;
    } else if (date == 4) {
      return prevYearFirstDay;
    } else if (date == 5) {
      return prevThreeYearFirstDay;
    } else if (date == 0) {
      return birthday;
    }
  };

  try {
    const data = await dbFindAggregate(
      InvRecordSchema,
      aggQuery(duration(activeDate))
    );
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kayıtlar Geitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.recordAdd = (
  code,
  portfolio,
  number,
  purchasePrice,
  purchaseDate,
  salePrice,
  saleDate,
  saleCommission
) => {
  const newRecord = YtHistory({
    code,
    portfolio,
    number,
    purchasePrice,
    purchaseDate,
    salePrice,
    saleDate,
    saleCommission,
  });
  dbSave(newRecord);
};

exports.recordDelete = async (req, res) => {
  try {
    dbFindByIdAndDelete(InvRecordSchema, req.params.id);
    res.status(200).json({ message: "Geçmiş Kayıt Silindi" });
  } catch (error) {
    res.status(500).json({
      message: "Geçmiş Kayıt Silinemedi, Server Bağlantı Hatası",
    });
  }
};
