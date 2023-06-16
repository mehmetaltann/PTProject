const InvPresentValueSchema = require("../../models/InvPresentValueModel");
const { fundScraper, moneyScraper } = require("./scraper");
const { dbFind, dbInsertMany, dbFindOneAndDelete } = require("../dbQueries");

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

async function presentValueAdd(dataList) {
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
}

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

async function fetchScrapData(presentData) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const result = [];
  for (const { code, portfolio } of presentData) {
    try {
      if (
        portfolio === "Bireysel Emeklilik Fonları" ||
        portfolio === "Yatırım Fonları"
      ) {
        await timer(300);
        res = await fundScraper(code, portfolio);
      } else if (portfolio === "Döviz" || portfolio === "Altın") {
        await timer(300);
        res = await moneyScraper(code, portfolio);
      }
      result.push(res);
    } catch (error) {
      console.log(`Yatırım değerlerini, başka siteden scrap hatası ${error}`);
    }
  }
  return result;
}

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

  const presentData = await InvPresentValueSchema.aggregate(query);
  const data = await fetchScrapData(presentData);
  const filteredData = data
    .filter((item) => item !== undefined)
    .filter((item) => item.price !== 0)
    .filter((item) => item.price !== "");

  const updateOps = filteredData.map((item) => {
    let updateData = {
      updateOne: {
        filter: {
          code: item.code,
        },
        update: {
          price: item.price,
        },
      },
    };
    console.log(updateData);
    return updateData;
  });
  try {
    const res = await InvPresentValueSchema.bulkWrite(updateOps);
  } catch (error) {
    console.log(`Veritabanında güncel değerleri, yenileme sırasında ${error}`);
  }
};

exports.presentValueDelete = (code) => {
  dbFindOneAndDelete(InvPresentValueSchema, { code: code });
};
