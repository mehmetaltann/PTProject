const Islem = require("../../models/YatirimIslemlerModel");
const GuncelData = require("../../models/YatirimGuncelDataModal");
const {
  dbDeleteOne,
  dbInsertMany,
  dbFindAggregate,
} = require("../dbTransections");
const { gecmisIslemEkle } = require("./yatirimGecmisIslemler");
const { guncelDataEkle, guncelDataSil } = require("./yatirimGuncelDeger");
const {
  acikPoziyonIslemSorgu,
  acikPoziyonIslemUpdate,
} = require("./yatirimDbQueries");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  calculateSum,
  birthday,
} = require("../../utils/helpFunctions");

const aggQuery = (creatDate) => {
  const islemQuery = [
    {
      $match: {
        createdAt: {
          $gte: creatDate,
        },
      },
    },
    {
      $lookup: {
        from: "gunceldatas",
        localField: "kod",
        foreignField: "kod",
        as: "guncel",
      },
    },
    {
      $unwind: "$guncel",
    },
    {
      $project: {
        _id: 1,
        action: 1,
        kod: 1,
        adet: 1,
        fiyat: 1,
        guncelFiyat: "$guncel.price",
        komisyon: 1,
        date: 1,
        portfoy_ismi: 1,
        durum: 1,
        islemMaliyeti: {
          $sum: [{ $multiply: ["$adet", "$fiyat"] }, "$komisyon"],
        },
        islemGuncelDegeri: { $multiply: ["$guncel.price", "$adet"] },
        islemKarZarar: {
          $subtract: [
            { $multiply: ["$guncel.price", "$adet"] },
            {
              $sum: [{ $multiply: ["$adet", "$fiyat"] }, "$komisyon"],
            },
          ],
        },
        islemKarZararYuzdesi: {
          $multiply: [
            {
              $divide: [
                {
                  $subtract: [
                    { $multiply: ["$guncel.price", "$adet"] },
                    {
                      $sum: [{ $multiply: ["$adet", "$fiyat"] }, "$komisyon"],
                    },
                  ],
                },
                {
                  $sum: [{ $multiply: ["$adet", "$fiyat"] }, "$komisyon"],
                },
              ],
            },
            100,
          ],
        },
        gun_farki: {
          $dateDiff: {
            startDate: "$date",
            endDate: new Date(),
            unit: "day",
          },
        },
      },
    },
  ];
  return islemQuery;
};

exports.yatirimIslemiSorgula = async (req, res) => {
  const activeDate = req.params.date;

  const dataQuery = (zaman) => {
    dbFindAggregate(Islem, aggQuery(zaman), res);
  };

  if (activeDate == 1) {
    dataQuery(thisMonthFirstDay);
  } else if (activeDate == 2) {
    dataQuery(prevThreeMonthFirstDay);
  } else if (activeDate == 3) {
    dataQuery(prevSixMonthFirstDay);
  } else if (activeDate == 4) {
    dataQuery(prevYearFirstDay);
  } else if (activeDate == 5) {
    dataQuery(prevThreeYearFirstDay);
  } else if (activeDate == 0) {
    dataQuery(birthday);
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
