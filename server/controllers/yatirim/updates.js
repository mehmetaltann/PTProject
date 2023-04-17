const Islem = require("../../models/YatirimIslemlerModel");

exports.acikPoziyonUpdate = async (
  durum,
  guncelAdet,
  alim_id,
  alim_date
) => {
  const filter = { _id: alim_id };
  const update = {
    durum: durum,
    son_guncelleme_date: alim_date,
    adet: guncelAdet,
  };
  await Islem.findOneAndUpdate(filter, update);
};
