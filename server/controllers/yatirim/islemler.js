const Islem = require("../../models/YatirimIslemlerModel");
const { acikPoziyonSorgu } = require("./queries");
const { calculateSum } = require("../../utils/helpFunctions");
const { tradeTransection } = require("./trade");

exports.islemEkle = async (req, res) => {
  const { action, kod, adet, fiyat, komisyon, date, portfoy_ismi } = req.body;

  const islem = Islem({
    action,
    kod,
    adet,
    fiyat,
    komisyon,
    date,
    portfoy_ismi,
  });

  const alim_list = await acikPoziyonSorgu(kod); //duurumu açık veya güncellendi olan alışlar
  const toplam_adet = calculateSum(alim_list, "adet"); //duurumu açık olan alışların toplam adedi
  const satilanAdet = Number(Number(adet).toFixed(8));

  try {
    if (action === "Alış") {
      await islem.save();
      res.status(200).json({ message: `"${kod}" Alış İşlemi Gerçekleşti` });
    } else {
      if (alim_list.length === 0) {
        res
          .status(200)
          .json({ message: `Portföyde "${kod}" Bulunmamaktadır.` });
      } else if (toplam_adet < satilanAdet) {
        res
          .status(200)
          .json({ message: `Belirlenen Sayıda "${kod}" Bulunmamaktadır.` });
      } else {
        await islem.save().then((savedDoc) => {
          tradeTransection(savedDoc._id, adet, alim_list);
        });
        res.status(200).json({ message: `"${kod}" Satım İşlemi Gerçekleşti` });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.islemSil = async (req, res) => {
  const { id } = req.params;
  Islem.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "İşlem Kalemi Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};
