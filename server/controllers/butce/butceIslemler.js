const ButceSchema = require("../../models/ButceDataModel");
const { dbDeleteOne, dbInsertMany, dbFind } = require("../dbTransections");
const {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../../utils/helpFunctions");

exports.butceIslemSorgula = async (req, res) => {
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
    dbFind(ButceSchema, query, sortQuery, res);
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

exports.butceIslemSil = async (req, res) => {
  dbDeleteOne(ButceSchema, req.params.id, "Bütçe Kalemi Silindi", res);
};

exports.butceIslemEkle = async (req, res) => {
  dbInsertMany(ButceSchema, req.body, "Bütçe İşlemleri Eklendi", res);
};
