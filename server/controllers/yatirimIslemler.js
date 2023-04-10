const Islem = require("../models/YatirimIslemlerModel");
const { tarihiKayitEkle } = require("./yatirimHistory");

exports.islemYap = async (req, res) => {
  const DATA = req.body;

  if (DATA.length === 0) {
    return res.status(400).json({ message: "Kayıt Ekleyiniz" });
  }

  for (const {
    action,
    kod,
    adet,
    fiyat,
    komisyon,
    date,
    portfoy_ismi,
  } of DATA) {
    const islem = Islem({
      action,
      kod,
      adet,
      fiyat,
      komisyon,
      date,
      portfoy_ismi,
    });

    const tradeTransection = async (
      kod,
      satimAdet,
      satimFiyat,
      satimTarihi,
      komisyon
    ) => {
      const alisListesi = async (kod) => {
        let queryObject = {
          action: "Alış",
          kod: kod,
          durum: "Açık",
        };
        let dataList = [];
        const codes = await Islem.find(queryObject)
          .sort({ date: "asc" })
          .then((code) => (dataList = code))
          .then((code) => res.status(200).json({ message: "ekli" }))
          .catch((error) => {
            res.status(500).json({ message: "Kayıt Getirilemedi" });
          });
        return dataList;
      };

      const alisUpdate = async (durum, alim_id, alim_date, secilenAlimAdet) => {
        const filter = { _id: alim_id };
        const update = {
          durum: durum,
          kapanis_date: alim_date,
          adet: secilenAlimAdet,
        };
        await Islem.findOneAndUpdate(filter, update)
          .then((code) =>
            res.status(200).json({ message: "Kayıtlar Güncellendi" })
          )
          .catch((error) => {
            res.status(500).json({ message: "Kayıt Güncellenemedi" });
          });
      };

      let alimlist = await alisListesi(kod);
      let satilanAdet = Number(Number(satimAdet).toFixed(8));

      while (satilanAdet > 0) {
        satilanAdet = Number(Number(satilanAdet).toFixed(8));
        let secilenAlim = alimlist[0];
        let secilenAlimAdet = Number(Number(secilenAlim.adet).toFixed(8));
        if (secilenAlimAdet === satilanAdet) {
          await alisUpdate(
            "Kapalı",
            secilenAlim.id,
            satimTarihi,
            secilenAlim.adet
          );
          await tarihiKayitEkle(
            kod,
            satilanAdet,
            secilenAlim.date,
            secilenAlim.fiyat,
            satimTarihi,
            satimFiyat,
            komisyon
          );
          satilanAdet = 0;
        } else if (secilenAlimAdet > satilanAdet) {
          secilenAlimAdet -= satilanAdet;
          await alisUpdate("Açık", secilenAlim.id, undefined, secilenAlimAdet);
          await tarihiKayitEkle(
            kod,
            satilanAdet,
            secilenAlim.date,
            secilenAlim.fiyat,
            satimTarihi,
            satimFiyat,
            komisyon
          );
          satilanAdet = 0;
        } else {
          await alisUpdate(
            "Kapalı",
            secilenAlim.id,
            satimTarihi,
            secilenAlim.adet
          );
          await tarihiKayitEkle(
            kod,
            secilenAlim.adet,
            secilenAlim.date,
            secilenAlim.fiyat,
            satimTarihi,
            satimFiyat,
            komisyon
          );
          satilanAdet -= secilenAlimAdet;
          alimlist.splice(0, 1);
        }
      }
    };

    try {
      //validation
      if (portfoy_ismi === "") {
        return res.status(400).json({ message: "Öncelikle Portföy Seçiniz" });
      }
      if (adet === 0 || fiyat === 0) {
        return res.status(400).json({ message: "Adet ve Birim Fiyat Giriniz" });
      }
      if (kod.length < 3 || kod.length > 5) {
        return res
          .status(400)
          .json({ message: "Kod en az 3 en fazla 5 karakter olabilir" });
      }
      //validation
      if (action === "Alış") {
        await islem.save();
        res.status(200).json({ message: "Alış İşlemleri Eklendi" });
      } else if (action === "Satış") {
        tradeTransection(kod, adet, fiyat, date, komisyon);
        await islem.save();
        res.status(200).json({ message: "Satış İşlemleri Eklendi" });
      } else {
        res.status(500).json({ message: "Geçerli bir işlem giriniz" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    }
  }
};
