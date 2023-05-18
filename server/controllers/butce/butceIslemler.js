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
  const sortQuery = { date: -1 };
  const dataQuery = (query = null) => {
    dbFind(ButceSchema, query, sortQuery, res);
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

exports.butceIslemSil = async (req, res) => {
  dbDeleteOne(ButceSchema, req.params.id, "Bütçe Kalemi Silindi", res);
};

exports.butceIslemEkle = async (req, res) => {
  dbInsertMany(ButceSchema, req.body, "Bütçe İşlemleri Eklendi", res);
};
