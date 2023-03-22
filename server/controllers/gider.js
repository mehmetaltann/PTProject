const GiderSchema = require("../models/GiderModel");
const {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevMonthLastDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../utils/helpFunctions");

exports.giderEkle = async (req, res) => {
  const { title, amount, categoryA, categoryB, description, date } = req.body;
  const gider = GiderSchema({
    title,
    amount,
    categoryA,
    categoryB,
    description,
    date,
  });

  try {
    //validation
    if (!title || !categoryA || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Boş Alan Bırakmayınız Bayım :)" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Rakamı Düzgün Giriniz :)" });
    }
    //validation
    await gider.save();
    res.status(200).json({ message: "Gider Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.giderSil = async (req, res) => {
  const { id } = req.params;
  GiderSchema.findByIdAndDelete(id)
    .then((gider) => {
      res.status(200).json({ message: "Gider Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};

exports.giderSorgula = async (req, res) => {
  const activeTarih = req.params.tarih;
  const activeCategory = req.params.category;
  try {
    if (activeTarih == 0) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find().sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else if (activeTarih == 1) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find({
          date: {
            $gte: thisMonthFirstDay,
            $lt: thisMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
          date: {
            $gte: thisMonthFirstDay,
            $lt: thisMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else if (activeTarih == 2) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find({
          date: {
            $gte: prevThreeMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
          date: {
            $gte: prevThreeMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else if (activeTarih == 3) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find({
          date: {
            $gte: prevSixMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
          date: {
            $gte: prevSixMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else if (activeTarih == 4) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find({
          date: {
            $gte: prevYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
          date: {
            $gte: prevYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else if (activeTarih == 5) {
      if (activeCategory === "Tümü") {
        const gider = await GiderSchema.find({
          date: {
            $gte: prevThreeYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      } else {
        const gider = await GiderSchema.find({
          categoryB: activeCategory,
          date: {
            $gte: prevThreeYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gider);
      }
    } else {
      res.status(500).json({ message: "Tarih Hatası" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};
