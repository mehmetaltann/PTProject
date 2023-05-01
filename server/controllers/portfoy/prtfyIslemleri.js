const Portfoy = require("../../models/PortfoyModel");

exports.portfoySorgula = async (req, res) => {
  try {
    const portfoyler = await Portfoy.find().then((kayit) =>
      res.status(200).json(kayit)
    );
  } catch (error) {
    res.status(500).json({ message: "Bağlantı Hatası, Portfoyler Alınamadı" });
  }
};

exports.portfoyEkle = async (req, res) => {
  const { kod, isim } = req.body;
  const portfoy = Portfoy({
    kod,
    isim,
  });

  try {
    //validation
    if (!kod || !isim) {
      return res
        .status(200)
        .json({ message: "Boş Alan Bırakmayınız Bayım :)" });
    }
    //validation
    await portfoy.save();
    res.status(200).json({ message: "Portfoy Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.portfoySil = async (req, res) => {
  const { id } = req.params;
  Portfoy.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "Portfoy Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};
