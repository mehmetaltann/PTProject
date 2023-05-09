const Islem = require("../../models/YatirimIslemlerModel");
const { dbDeleteOne, dbInsertMany, dbFind } = require("../dbTransections");
const { acikPoziyonIslemSorgu } = require("./yatirimDbQueries");
const {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../../utils/helpFunctions");

exports.yatirimIslemSorgula = async (req, res) => {
  const activeDate = req.params.date;
  const dateQuery = (first, second) => {
    return {
      date: {
        $gte: first,
        $lt: second,
      },
    };
  };
  const sortQuery = { date: -1 };
  const dataQuery = (query = null) => {
    dbFind(Islem, query, sortQuery, res);
  };

  if (activeDate == 1) {
    dataQuery(dateQuery(thisMonthFirstDay, thisMonthLastDay));
  } else if (activeDate == 2) {
    dataQuery(dateQuery(prevThreeMonthFirstDay, thisMonthLastDay));
  } else if (activeDate == 3) {
    dataQuery(dateQuery(prevSixMonthFirstDay, thisMonthLastDay));
  } else if (activeDate == 4) {
    dataQuery(dateQuery(prevYearFirstDay, thisMonthLastDay));
  } else if (activeDate == 5) {
    dataQuery(dateQuery(prevThreeYearFirstDay, thisMonthLastDay));
  } else if (activeDate == 0) {
    dataQuery();
  }
};

exports.yatirimIslemSil = async (req, res) => {
  dbDeleteOne(Islem, req.params.id, "Yatırım Kalemi Silindi", res);
};

exports.yatirimAlisIslemEkle = async (req, res) => {
  dbInsertMany(Islem, req.body, "Yatırım İşlemleri Eklendi", res);
};

exports.yatirimSatisIslemEkle = async (req, res) => {
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

  const alim_list = acikPoziyonIslemSorgu(kod); //duurumu açık veya güncellendi olan alışlar
  res.status(200).json(alim_list);
};
