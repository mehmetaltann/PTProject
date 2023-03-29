const Islem = require("../models/YatirimIslemlerModel");
const { tarihiKayitEkle } = require("../controllers/yatirimHistory");

exports.islemYap = async (req, res) => {
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
        .sort({ date: 1 })
        .then((code) => (dataList = code))
        .then((code) => res.status(200).json({ message: "ekli" }))
        .catch((error) => {
          res.status(500).json({ message: "Alış Listesi Hatası" });
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
      console.log(update);
      await Islem.findOneAndUpdate(filter, update);
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

  const { action, kod, adet, fiyat, komisyon, date } = req.body;
  const islem = Islem({
    action,
    kod,
    adet,
    fiyat,
    komisyon,
    date,
  });

  try {
    //validation
    //validation
    if (action === "Alış") {
      await islem.save();
      res.status(200).json({ message: "İşlem Eklendi" });
    } else if (action === "Satış") {
      tradeTransection(kod, adet, fiyat, date, komisyon);
      await islem.save();
    } else {
      res.status(500).json({ message: "Geçerli bir işlem giriniz" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
