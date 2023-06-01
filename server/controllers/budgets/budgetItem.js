const BudgetItemSchema = require("../../models/BudgetItemModel");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbInsertMany,
  dbFindByIdAndUpdate,
} = require("../dbQueries");
const {
  thisMonthFirstDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
} = require("../../utils/helpFunctions");

exports.budgetItemQuery = async (req, res) => {
  const activeDate = req.params.date;
  const sortQuery = { date: -1 };
  const query = (date) => {
    if (date == 1) {
      return { date: { $gte: thisMonthFirstDay } };
    } else if (date == 2) {
      return { date: { $gte: prevThreeMonthFirstDay } };
    } else if (date == 3) {
      return { date: { $gte: prevSixMonthFirstDay } };
    } else if (date == 4) {
      return { date: { $gte: prevYearFirstDay } };
    } else if (date == 5) {
      return { date: { $gte: prevThreeYearFirstDay } };
    } else if (date == 0) {
      return null;
    }
  };

  try {
    const data = await dbFind(BudgetItemSchema, query(activeDate), sortQuery);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kayıtlar Geitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.budgetItemsAdd = async (req, res) => {
  try {
    await dbInsertMany(BudgetItemSchema, req.body);
    res.status(200).json({ message: "Bütçe İşlemleri Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bütçe İşlemleri Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.budgetItemUpdate = async (req, res) => {
  updateData = {
    title: req.body.title,
    date: req.body.date,
    amount: req.body.amount,
    description: req.body.description,
  };
  try {
    await dbFindByIdAndUpdate(BudgetItemSchema, req.params.id, updateData);
    res.status(200).json({ message: "Bütçe Kalemi Güncellendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bütçe Kalemi Güncellenemedi, Server Bağlantı Hatası" });
  }
};

exports.budgetItemDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(BudgetItemSchema, req.params.id);
    res.status(200).json({ message: "Bütçe Kalemi Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bütçe Kalemi Silinemedi, Server Bağlantı Hatası" });
  }
};
