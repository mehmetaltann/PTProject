const InvPresentValueSchema = require("../../models/InvPresentValueModel");
const { fundScraper, moneyScraper } = require("./scraper");
const {
  dbFind,
  dbInsertMany,
  dbFindOneAndDelete,
  dbFindOneAndUpdate,
} = require("../dbQueries");

exports.presentValueQuery = async (req, res) => {
  try {
    const data = await dbFind(InvPresentValueSchema);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Güncel Değerler Gitirilemedi, Server Bağlantı Hatası",
    });
  }
};

const presentValueAdd = async (dataList) => {
  Promise.all(
    dataList.map(({ portfolio, code }) => {
      if (
        portfolio === "Bireysel Emeklilik Fonları" ||
        portfolio === "Yatırım Fonları"
      ) {
        return fundScraper(code, portfolio).then((res) => res);
      } else if (portfolio === "Döviz" || portfolio === "Altın") {
        return moneyScraper(code, portfolio).then((res) => res);
      }
    })
  )
    .then(async (data) => {
      dbInsertMany(InvPresentValueSchema, data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendPresentValues = async (dataList) => {
  const codeList = dataList
    .map(({ code }) => code)
    .filter((value, index, array) => array.indexOf(value) === index);

  try {
    const findCodes = await dbFind(InvPresentValueSchema, {
      code: {
        $in: codeList,
      },
    });
    const findCodesList =
      findCodes.length > 0 ? findCodes.map(({ code }) => code) : [];

    const isNewDataExist = findCodesList.length < codeList.length;

    if (isNewDataExist) {
      const presentValues = dataList.filter(
        ({ code }) => !findCodes?.map(({ code }) => code).includes(code)
      );
      presentValueAdd(presentValues);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.presentValueDelete = (code) => {
  dbFindOneAndDelete(InvPresentValueSchema, { code: code });
};

exports.presentValueQueryAndUpdate = async () => {
  const query = [
    {
      $project: {
        _id: 0,
        code: 1,
        portfolio: 1,
      },
    },
  ];
  try {
    const presentData = await InvPresentValueSchema.aggregate(query);
    Promise.all(
      presentData.map(({ portfolio, code }) => {
        if (
          portfolio === "Bireysel Emeklilik Fonları" ||
          portfolio === "Yatırım Fonları"
        ) {
          return fundScraper(code, portfolio).then((res) => res);
        } else if (portfolio === "Döviz" || portfolio === "Altın") {
          return moneyScraper(code, portfolio).then((res) => res);
        }
      })
    )
      .then(async (data) => {
        Promise.all(
          data.map(({ price, code }) => {
            dbFindOneAndUpdate(
              InvPresentValueSchema,
              { code: code },
              { price: newPrice }
            );
          })
        )
          .then((data2) => {
            console.log("Success");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.error(e);
  }
};


