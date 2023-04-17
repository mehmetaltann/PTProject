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

  const alimlist = await acikPoziyonSorgu(kod); //duurumu açık veya güncellendi olan alışlar
  const totalAdet = calculateSum(alimlist, "adet"); //duurumu açık olan alışların toplam adedi
  const satilanAdet = Number(Number(adet).toFixed(8));

  try {
    if (action === "Alış") {
      await islem.save();
      res.status(200).json({ message: `"${kod}" Alış İşlemi Gerçekleşti` });
    } else {
      if (alimlist.length === 0) {
        res
          .status(200)
          .json({ message: `Portföyde "${kod}" Bulunmamaktadır.` });
      } else if (totalAdet < satilanAdet) {
        res
          .status(200)
          .json({ message: `Belirlenen Sayıda "${kod}" Bulunmamaktadır.` });
      } else {
        tradeTransection(kod, satilanAdet, fiyat, date, komisyon, alimlist);
        await islem.save();
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
