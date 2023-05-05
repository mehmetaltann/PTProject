const ButceSchema = require("../../models/ButceDataModel");
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

  try {
    if (activeDate == 1) {
      await ButceSchema.find(dateQuery(thisMonthFirstDay, thisMonthLastDay))
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    } else if (activeDate == 2) {
      await ButceSchema.find(
        dateQuery(prevThreeMonthFirstDay, thisMonthLastDay)
      )
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    } else if (activeDate == 3) {
      await ButceSchema.find(dateQuery(prevSixMonthFirstDay, thisMonthLastDay))
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    } else if (activeDate == 4) {
      await ButceSchema.find(dateQuery(prevYearFirstDay, thisMonthLastDay))
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    } else if (activeDate == 5) {
      await ButceSchema.find(dateQuery(prevThreeYearFirstDay, thisMonthLastDay))
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    } else if (activeDate == 0) {
      await ButceSchema.find()
        .sort({ date: -1 })
        .then((butceKalemi) => res.status(200).json(butceKalemi));
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.butceIslemSil = async (req, res) => {
  const { id } = req.params;
  ButceSchema.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "Bütçe Kalemi Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};
