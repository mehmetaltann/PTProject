const GuncelData = require("../../models/YatirimGuncelDataModal");
const { fonScraper, moneyScraper } = require("./yatirimScraper");

const fonScrapFunc = async (kod, portfoy_ismi) => {
  const response = await fonScraper(kod);
  return {
    title: response.title,
    fiyat: parseFloat(response.price.replace(/,/, ".")),
    category: response.category,
    kod: kod,
    portfoy: portfoy_ismi,
  };
};

const guncelDataDbSend = async (data) => {
  try {
    await GuncelData.insertMany(data);
  } catch (error) {
    console.log(error);
  }
};

exports.guncelDataEkle = async (dataList) => {
  Promise.all(
    dataList.map(({ portfoy_ismi, kod }) => {
      if (
        portfoy_ismi === "Bireysel Emeklilik Fonları" ||
        portfoy_ismi === "Yatırım Fonları"
      ) {
        return fonScrapFunc(kod, portfoy_ismi).then((res) => res);
      } else if (portfoy_ismi === "Döviz" || portfoy_ismi === "Altın") {
        return moneyScraper(kod, portfoy_ismi).then((res) => res);
      }
    })
  )
    .then((data) => {
      guncelDataDbSend(data);
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
