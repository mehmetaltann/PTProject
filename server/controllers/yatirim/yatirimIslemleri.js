const Islem = require("../../models/YatirimIslemlerModel");
const GuncelData = require("../../models/YatirimGuncelDataModal");
const { dbDeleteOne, dbInsertMany, dbFind } = require("../dbTransections");
const { gecmisIslemEkle } = require("./yatirimGecmisIslemler");
const { guncelDataEkle, guncelDataSil } = require("./yatirimGuncelDeger");
const {
  acikPoziyonIslemSorgu,
  acikPoziyonIslemUpdate,
} = require("./yatirimDbQueries");
const { moneyScraper } = require("./yatirimScraper");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  calculateSum,
} = require("../../utils/helpFunctions");

const yatirimFifoIslemi = async (satis_id, satilanAdet, alim_list) => {
  while (satilanAdet > 0) {
    let secilenAlim = alim_list[0];
    let secilenAlimIlkAdet = Number(Number(secilenAlim.adet).toFixed(8));

    if (secilenAlimIlkAdet === satilanAdet) {
      await gecmisIslemEkle(
        secilenAlimIlkAdet,
        secilenAlim.kod,
        secilenAlim.fiyat,
        secilenAlim.date,
        secilenAlim.portfoy_ismi,
        satis_id
      );
      await Islem.findByIdAndDelete(secilenAlim.id);
      satilanAdet = 0;
    } else if (secilenAlimIlkAdet > satilanAdet) {
      secilenAlimIlkAdet -= satilanAdet;
      await acikPoziyonIslemUpdate(
        secilenAlim.id,
        "Güncellendi",
        secilenAlimIlkAdet
      );
      await gecmisIslemEkle(
        satilanAdet,
        secilenAlim.kod,
        secilenAlim.fiyat,
        secilenAlim.date,
        secilenAlim.portfoy_ismi,
        satis_id
      );
      satilanAdet = 0;
    } else {
      await gecmisIslemEkle(
        secilenAlimIlkAdet,
        secilenAlim.kod,
        secilenAlim.fiyat,
        secilenAlim.date,
        secilenAlim.portfoy_ismi,
        satis_id
      );
      satilanAdet -= secilenAlimIlkAdet;
      alim_list.splice(0, 1);
      await Islem.findByIdAndDelete(secilenAlim.id);
    }
  }
};

exports.yatirimIslemiSorgula = async (req, res) => {
  const activeDate = req.params.date;
  const sortQuery = { date: -1 };
  const dataQuery = (query = null) => {
    dbFind(Islem, query, sortQuery, res);
  };

  if (activeDate == 1) {
    dataQuery({ date: { $gte: thisMonthFirstDay } });
  } else if (activeDate == 2) {
    dataQuery({ date: { $gte: prevThreeMonthFirstDay } });
  } else if (activeDate == 3) {
    dataQuery({ date: { $gte: prevSixMonthFirstDay } });
  } else if (activeDate == 4) {
    dataQuery({ date: { $gte: prevYearFirstDay } });
  } else if (activeDate == 5) {
    dataQuery({ date: { $gte: prevThreeYearFirstDay } });
  } else if (activeDate == 0) {
    dataQuery();
  }
};

exports.yatirimIslemiSil = async (req, res) => {
  dbDeleteOne(Islem, req.params.id, "Yatırım Kalemi Silindi", res);
};

exports.yatirimAlisIslemiEkle = async (req, res) => {
  const islemList = req.body;
  dbInsertMany(Islem, islemList, "Yatırım İşlemleri Eklendi", res);
  const kodList = islemList
    .map(({ kod }) => kod)
    .filter((value, index, array) => array.indexOf(value) === index);
  const findcodes = await GuncelData.find({
    kod: {
      $in: kodList,
    },
  });
  const findcodesList = findcodes.map(({ kod }) => kod);
  let gunceleEkle = findcodesList.length < kodList.length;
  if (gunceleEkle) {
    const guncelDataEklenecekler = islemList.filter(
      ({ kod }) => !findcodes.map(({ kod }) => kod).includes(kod)
    );
    guncelDataEkle(guncelDataEklenecekler);
  }
};

exports.yatirimSatisIslemiEkle = async (req, res) => {
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

  const alim_list = await acikPoziyonIslemSorgu(kod); //durumu açık veya güncellendi olan alışlar
  const toplam_adet = calculateSum(alim_list, "adet");
  const satilanAdet = Number(Number(adet).toFixed(8));

  if (toplam_adet === satilanAdet) {
    await guncelDataSil(kod);
  }

  if (alim_list.length === 0) {
    res.status(200).json({ message: `Portföyde "${kod}" Bulunmamaktadır.` });
  } else if (toplam_adet < satilanAdet) {
    res
      .status(200)
      .json({ message: `Belirlenen Sayıda "${kod}" Bulunmamaktadır.` });
  } else {
    try {
      const savedDoc = await islem.save();
      yatirimFifoIslemi(savedDoc._id, adet, alim_list);
    } catch (error) {
      res.status(500).json({ message: "Bağlantı Hatası" });
    } finally {
      res.status(200).json({ message: `"${kod}" Satış İşlemi Gerçekleşti` });
    }
  }
};
