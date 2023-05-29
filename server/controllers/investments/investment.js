const InvestmentSchema = require("../../models/InvestmentModel");
const InvPresentValueSchema = require("../../models/InvPresentValueModel");
const { recordAdd } = require("./record");
const { presentValueDelete, sendPresentValues } = require("./presentValue");
const {
  dbInsertMany,
  dbFind,
  dbFindAggregate,
  dbFindOneAndUpdate,
  dbFindByIdAndDelete,
} = require("../dbQueries");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  calculateSum,
  birthday,
} = require("../../utils/helpFunctions");

const aggQuery = (purhaseDate) => {
  const transectionQuery = [
    {
      $match: {
        date: {
          $gte: purhaseDate,
        },
      },
    },
    { $sort: { date: -1 } },
    {
      $lookup: {
        from: "presentvalues",
        localField: "code",
        foreignField: "code",
        as: "presentvalue",
      },
    },
    {
      $unwind: "$presentvalue",
    },
    {
      $project: {
        _id: 1,
        code: 1,
        number: 1,
        price: 1,
        commission: 1,
        date: 1,
        portfolio: 1,
        state: 1,
        presentPrice: "$presentvalue.price",
        cost: {
          $sum: [{ $multiply: ["$number", "$price"] }, "$commission"],
        },
        presentvalue: { $multiply: ["$presentvalue.price", "$number"] },
        plStatus: {
          $subtract: [
            { $multiply: ["$presentvalue.price", "$number"] },
            {
              $sum: [{ $multiply: ["$number", "$price"] }, "$commission"],
            },
          ],
        },
        plPercentage: {
          $multiply: [
            {
              $divide: [
                {
                  $subtract: [
                    { $multiply: ["$presentvalue.price", "$number"] },
                    {
                      $sum: [
                        { $multiply: ["$number", "$price"] },
                        "$commission",
                      ],
                    },
                  ],
                },
                {
                  $sum: [{ $multiply: ["$number", "$price"] }, "$commission"],
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
      InvestmentSchema,
      aggQuery(duration(activeDate))
    );
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kayıtlar Geitirilemedi, Server Bağlantı Hatası" });
  }
};



exports.investmentPurchase = async (req, res) => {
  const transectionList = req.body;
  try {
    await dbInsertMany(InvestmentSchema, transectionList);
    res.status(200).json({ message: "Yatırım İşlemleri Eklendi" });
    await sendPresentValues(transectionList);
  } catch (error) {
    res.status(500).json({
      message: "Yatırım İşlemleri Eklenemedi, Server Bağlantı Hatası",
    });
  }
  

};

const invFifo = async (data, invList) => {
  const { number, price, date, commission } = data;
  let sellNumber = number;
  while (sellNumber > 0) {
    let pickedInv = invList[0];
    let pickedInvNumber = Number(Number(pickedInv.number).toFixed(8));
    if (pickedInvNumber === sellNumber) {
      recordAdd(
        pickedInv.code,
        pickedInv.portfolio,
        sellNumber,
        pickedInv.price,
        pickedInv.date,
        price,
        date,
        commission
      );
      dbFindByIdAndDelete(InvestmentSchema, pickedInv.id);
      sellNumber = 0;
    } else if (pickedInvNumber > sellNumber) {
      pickedInvNumber -= sellNumber;
      dbFindOneAndUpdate(
        InvestmentSchema,
        { _id: pickedInv.id },
        {
          state: "updated",
          number: pickedInvNumber,
        }
      );
      recordAdd(
        pickedInv.code,
        pickedInv.portfolio,
        sellNumber,
        pickedInv.price,
        pickedInv.date,
        price,
        date,
        commission
      );
      sellNumber = 0;
    } else {
      sellNumber -= pickedInvNumber;
      dbFindByIdAndDelete(InvestmentSchema, pickedInv.id);
      recordAdd(
        pickedInv.code,
        pickedInv.portfolio,
        pickedInv.number,
        pickedInv.price,
        pickedInv.date,
        price,
        date,
        commission
      );
      invList.splice(0, 1);
    }
  }
};

exports.investmentSell = async (req, res) => {
  const { code, number } = req.body;
  const soldNumber = Number(Number(number).toFixed(8));
  try {
    const invlist = await dbFind(
      InvestmentSchema,
      {
        code: code,
      },
      { date: 1 }
    );

    const invTotalNumber = calculateSum(invlist, "number");

    if (invTotalNumber === 0) {
      res.status(200).json({ message: `Portföyde "${code}" Bulunmamaktadır.` });
    } else if (invTotalNumber < soldNumber) {
      res
        .status(200)
        .json({ message: `Belirlenen Sayıda "${code}" Bulunmamaktadır.` });
    } else if (invTotalNumber === soldNumber) {
      try {
        await invFifo(req.body, invlist);
        res.status(200).json({ message: `"${code}" Satış İşlemi Gerçekleşti` });
      } catch (error) {
        res.status(200).json(error.message);
      }
      presentValueDelete(code);
    } else {
      try {
        await invFifo(req.body, invlist);
        res.status(200).json({ message: `"${code}" Satış İşlemi Gerçekleşti` });
      } catch (error) {
        res.status(200).json(error.message);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

exports.investmentDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(InvestmentSchema, req.params.id);
    res.status(200).json({ message: "Yatırım Kalemi Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Yatırım Kalemi Silinemedi, Server Bağlantı Hatası" });
  }
};
