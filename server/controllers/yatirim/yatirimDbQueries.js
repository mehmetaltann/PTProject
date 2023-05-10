const Islem = require("../../models/YatirimIslemlerModel");

exports.acikPoziyonIslemSorgu = async (kod) => {
  const queryObject = {
    action: "Alış",
    kod: kod,
    $or: [{ durum: "Açık" }, { durum: "Güncellendi" }],
  };
  try {
    const data = await Islem.find(queryObject).sort({ date: "asc" });
    return data;
  } catch (error) {
    return "Veri Alınamadı";
  }
};

exports.acikPoziyonIslemUpdate = async (alim_id, durum, guncelAdet) => {
  const filter = { _id: alim_id };
  const update = {
    durum: durum,
    adet: guncelAdet,
  };
  await Islem.findOneAndUpdate(filter, update);
};
