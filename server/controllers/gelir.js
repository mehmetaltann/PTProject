const GelirSchema = require("../models/GelirModel");
const {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevMonthLastDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../utils/helpFunctions");

exports.gelirEkle = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const gelir = GelirSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validation
    if (!title || !category || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Boş Alan Bırakmayınız Bayım :)" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Rakamı Düzgün Giriniz :)" });
    }
    //validation
    await gelir.save();
    res.status(200).json({ message: "Gelir Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.gelirSil = async (req, res) => {
  const { id } = req.params;
  GelirSchema.findByIdAndDelete(id)
    .then((gelir) => {
      res.status(200).json({ message: "Gelir Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};

exports.gelirSorgula = async (req, res) => {
  const activeTarih = req.params.tarih;
  const activeCategory = req.params.category;
  try {
    if (activeTarih == 0) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find().sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({ category: activeCategory }).sort(
          { createdAt: -1 }
        );
        res.status(200).json(gelir);
      }
    } else if (activeTarih == 1) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find({
          date: {
            $gte: thisMonthFirstDay,
            $lt: thisMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({
          category: activeCategory,
          date: {
            $gte: thisMonthFirstDay,
            $lt: thisMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      }
    } else if (activeTarih == 2) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find({
          date: {
            $gte: prevThreeMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({
          category: activeCategory,
          date: {
            $gte: prevThreeMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      }
    } else if (activeTarih == 3) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find({
          date: {
            $gte: prevSixMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({
          category: activeCategory,
          date: {
            $gte: prevSixMonthFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      }
    } else if (activeTarih == 4) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find({
          date: {
            $gte: prevYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({
          category: activeCategory,
          date: {
            $gte: prevYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      }
    } else if (activeTarih == 5) {
      if (activeCategory === "Tümü") {
        const gelir = await GelirSchema.find({
          date: {
            $gte: prevThreeYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      } else {
        const gelir = await GelirSchema.find({
          category: activeCategory,
          date: {
            $gte: prevThreeYearFirstDay,
            $lt: prevMonthLastDay,
          },
        }).sort({ createdAt: -1 });
        res.status(200).json(gelir);
      }
    } else {
      res.status(500).json({ message: "Tarih Hatası" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

/*
 */
