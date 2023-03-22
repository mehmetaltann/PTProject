const ButceSchema = require("../models/ButceDataModel");
const {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevMonthLastDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../utils/helpFunctions");

exports.butceSorgula = async (req, res) => {
  const activeTarih = req.params.tarih;
  const activeCategory = req.params.category;
  const categoryQuery = [
    {
      categoryB: activeCategory,
    },
    {
      categoryA: activeCategory,
    },
  ];
  const dateQuery = (first, second) => {
    return {
      date: {
        $gte: first,
        $lt: second,
      },
    };
  };

  try {
    if (activeTarih == 0) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find()
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find()
          .or(categoryQuery)
          .sort({
            createdAt: -1,
          })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else if (activeTarih == 1) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find(
          dateQuery(thisMonthFirstDay, thisMonthLastDay)
        )
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find(
          dateQuery(thisMonthFirstDay, thisMonthLastDay)
        )
          .or(categoryQuery)
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else if (activeTarih == 2) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevThreeMonthFirstDay, prevMonthLastDay)
        )
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevThreeMonthFirstDay, prevMonthLastDay)
        )
          .or(categoryQuery)
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else if (activeTarih == 3) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevSixMonthFirstDay, prevMonthLastDay)
        )
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevSixMonthFirstDay, prevMonthLastDay)
        )
          .or(categoryQuery)
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else if (activeTarih == 4) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevYearFirstDay, prevMonthLastDay)
        )
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevYearFirstDay, prevMonthLastDay)
        )
          .or(categoryQuery)
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else if (activeTarih == 5) {
      if (activeCategory === "Tümü") {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevThreeYearFirstDay, prevMonthLastDay)
        )
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      } else {
        const butceKalemi = await ButceSchema.find(
          dateQuery(prevThreeYearFirstDay, prevMonthLastDay)
        )
          .or(categoryQuery)
          .sort({ createdAt: -1 })
          .then((butceKalemi) => res.status(200).json(butceKalemi));
      }
    } else {
      res.status(500).json({ message: "Tarih Hatası" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};