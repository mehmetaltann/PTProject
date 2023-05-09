const Islem = require("../../models/YatirimIslemlerModel");

exports.acikPoziyonIslemSorgu = async (kod) => {
  const queryObject = {
    action: "Alış",
    kod: kod,
    $or: [{ durum: "Açık" }, { durum: "Güncellendi" }],
  };
  let dataList = [];
  try {
    const data = await Islem.find(queryObject).sort({ date: "asc" });
    dataList = data
    return dataList;
  } catch (error) {
    return "Veri Alınamadı";
  }
};
