const InvestmentSchema = require("../../models/InvestmentModel");
const { dbFindAggregate } = require("../dbQueries");

const query = [
  {
    $group: {
      _id: { k: "$code", p: "$portfolio" },
      totalCost: {
        $sum: {
          $multiply: ["$price", "$number"],
        },
      },
      totalNumber: {
        $sum: "$number",
      },
    },
  },
  {
    $lookup: {
      from: "presentvalues",
      localField: "_id.k",
      foreignField: "code",
      as: "presentvalue",
    },
  },
  {
    $unwind: "$presentvalue",
  },
  {
    $project: {
      id: "$presentvalue._id",
      code: "$_id.k",
      _id: 0,
      portfolio: "$_id.p",
      title: "$presentvalue.title",
      category: "$presentvalue.category",
      totalNumber: "$totalNumber",
      presentPrice: "$presentvalue.price",
      averagePrice: { $divide: ["$totalCost", "$totalNumber"] },
      presentValue: { $multiply: ["$presentvalue.price", "$totalNumber"] },
      totalCost: "$totalCost",
      plStatus: {
        $subtract: [
          { $multiply: ["$presentvalue.price", "$totalNumber"] },
          "$totalCost",
        ],
      },
      plPercentage: {
        $multiply: [
          {
            $divide: [
              {
                $subtract: [
                  { $multiply: ["$presentvalue.price", "$totalNumber"] },
                  "$totalCost",
                ],
              },
              "$totalCost",
            ],
          },
          100,
        ],
      },
    },
  },
];

exports.presentPositions = async (req, res) => {
  try {
    const data = await dbFindAggregate(InvestmentSchema, query);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Özet Bilgiler Gitirilemedi, Server Bağlantı Hatası" });
  }
};
