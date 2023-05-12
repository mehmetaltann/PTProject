const GuncelData = require("../../models/YatirimGuncelDataModal");
const { scraper } = require("./yatirimScraper");

exports.guncelDataEkle = async (dataList) => {
  const scrap = await scraper("AFT");
  const data = dataList.map(({ portfoy_ismi, kod }) => {
    return { portfoy: portfoy_ismi, kod: kod, fiyat: parseFloat(scrap.price) };
  });

  await GuncelData.insertMany(data);
};

exports.yatirimScrap = async (req, res) => {
  data = await scraper("AFT");
  res.status(200).json(data);
};
