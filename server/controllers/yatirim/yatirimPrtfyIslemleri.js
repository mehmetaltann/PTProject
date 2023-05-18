const Portfoy = require("../../models/PortfoyModel");
const { dbDeleteOne, dbSaveOne, dbFind } = require("../dbTransections");

exports.portfoySorgula = async (req, res) => {
  dbFind(Portfoy, undefined, undefined, res);
};

exports.portfoyEkle = async (req, res) => {
  const { kod, isim } = req.body;
  const portfoy = Portfoy({
    kod,
    isim,
  });

  dbSaveOne(portfoy, "Portfoy Eklendi", res);
};

exports.portfoySil = async (req, res) => {
  dbDeleteOne(Portfoy, req.params.id, "Portfoy Silindi", res);
};
