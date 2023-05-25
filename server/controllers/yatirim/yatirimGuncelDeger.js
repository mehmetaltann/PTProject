const GuncelData = require("../../models/YatirimGuncelDataModal");
const { fonScraper, moneyScraper } = require("./yatirimScraper");
const { dbFind } = require("../dbTransections");

exports.guncelDataSorgula = async (req, res) => {
  dbFind(GuncelData, undefined, undefined, res);
};

exports.guncelDataEkle = async (dataList) => {
  Promise.all(
    dataList.map(({ portfoy_ismi, kod }) => {
      if (
        portfoy_ismi === "Bireysel Emeklilik Fonları" ||
        portfoy_ismi === "Yatırım Fonları"
      ) {
        return fonScraper(kod, portfoy_ismi).then((res) => res);
      } else if (portfoy_ismi === "Döviz" || portfoy_ismi === "Altın") {
        return moneyScraper(kod, portfoy_ismi).then((res) => res);
      }
    })
  )
    .then(async (data) => {
      try {
        await GuncelData.insertMany(data);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.guncelDataSil = async (kod) => {
  try {
    await GuncelData.findOneAndDelete({ kod: kod });
  } catch (error) {
    condole.log(error);
  }
};

const dbFindAndUpdate = async (kod, newPrice) => {
  const filter = { kod: kod };
  const update = { price: newPrice };
  return await GuncelData.findOneAndUpdate(filter, update);
};

exports.guncelDataSorGuncelle = async () => {
  const guncelDataQuery = [
    {
      $project: {
        _id: 0,
        kod: 1,
        portfoy: 1,
      },
    },
  ];

  const guncelData = await GuncelData.aggregate(guncelDataQuery);

  Promise.all(
    guncelData.map(({ portfoy, kod }) => {
      if (
        portfoy === "Bireysel Emeklilik Fonları" ||
        portfoy === "Yatırım Fonları"
      ) {
        return fonScraper(kod, portfoy).then((res) => res);
      } else if (portfoy === "Döviz" || portfoy === "Altın") {
        return moneyScraper(kod, portfoy).then((res) => res);
      }
    })
  )
    .then(async (data) => {
      Promise.all(
        data.map(({ price, kod }) => {
          dbFindAndUpdate(kod, price);
        })
      )
        .then((data2) => {
          console.log("Başarılı");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
