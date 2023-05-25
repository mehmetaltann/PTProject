const InvestmentSchema = require("../../models/InvestmentModel");
const InvCurrentValueSchema = require("../../models/InvCurrentValueModel");
const { dbFindAggregate, dbInsertMany } = require("../dbTransections");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  calculateSum,
  birthday,
} = require("../../utils/helpFunctions");

const aggQuery = (creatDate) => {
  const transectionQuery = [
    {
      $match: {
        createdAt: {
          $gte: creatDate,
        },
      },
    },
    {
      $lookup: {
        from: "gunceldatas",
        localField: "kod",
        foreignField: "kod",
        as: "guncel",
      },
    },
    {
      $unwind: "$guncel",
    },
    {
      $project: {
        _id: 1,
        code: 1,
        piece: 1,
        price: 1,
        commission: 1,
        date: 1,
        portfolio: 1,
        state: 1,
        actualPrice: "$guncel.price",
        transectionCost: {
          $sum: [{ $multiply: ["$piece", "$price"] }, "$commission"],
        },
        transectionActualPrice: { $multiply: ["$guncel.price", "$piece"] },
        transectionResult: {
          $subtract: [
            { $multiply: ["$guncel.price", "$piece"] },
            {
              $sum: [{ $multiply: ["$piece", "$price"] }, "$commission"],
            },
          ],
        },
        transectionResultPercentage: {
          $multiply: [
            {
              $divide: [
                {
                  $subtract: [
                    { $multiply: ["$guncel.price", "$piece"] },
                    {
                      $sum: [
                        { $multiply: ["$piece", "$price"] },
                        "$commission",
                      ],
                    },
                  ],
                },
                {
                  $sum: [{ $multiply: ["$piece", "$price"] }, "$commission"],
                },
              ],
            },
            100,
          ],
        },
        dayDiff: {
          $dateDiff: {
            startDate: "$date",
            endDate: new Date(),
            unit: "day",
          },
        },
      },
    },
  ];
  return transectionQuery;
};

exports.investmentQuery = async (req, res) => {
  const activeDate = req.params.date;

  const dataQuery = (duration) => {
    dbFindAggregate(InvestmentSchema, aggQuery(duration), res);
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

exports.investmentDelete = async (req, res) => {
  dbDeleteOne(InvestmentSchema, req.params.id, "Yatırım Kalemi Silindi", res);
};

const compareWithCurrentList = async (postDataList) => {
  const codeList = postDataList
    .map(({ code }) => code)
    .filter((value, index, array) => array.indexOf(value) === index);
  const findcodes = await InvCurrentValueSchema.find({
    code: {
      $in: codeList,
    },
  });
  const findCodesList = findcodes.map(({ kod }) => kod);
  const isNewDataExist = findCodesList.length < codeList.length;
  return isNewDataExist;
};

exports.investmentNewAdd = async (req, res) => {
  const transectionList = req.body;

  dbInsertMany(
    InvestmentSchema,
    transectionList,
    "Yatırım İşlemleri Eklendi",
    res
  );

  if (compareWithCurrentList(transectionList)) {
    const guncelDataEklenecekler = transectionList.filter(
      ({ code }) => !findcodes.map(({ code }) => code).includes(code)
    );
    guncelDataEkle(guncelDataEklenecekler);
  }
};
