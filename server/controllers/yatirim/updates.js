const Islem = require("../../models/YatirimIslemlerModel");

exports.acikPoziyonUpdate = async (alim_id, durum, guncelAdet) => {
  const filter = { _id: alim_id };
  const update = {
    durum: durum,
    adet: guncelAdet,
  };
  await Islem.findOneAndUpdate(filter, update);
};
