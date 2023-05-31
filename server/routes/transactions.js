const router = require("express").Router();

//Budget
const {
  budgetItemQuery,
  budgetItemDelete,
  budgetItemsAdd,
} = require("../controllers/budgets/budgetItem");
router.post("/butce-veri-ekle", budgetItemsAdd);
router.delete("/butce-veri-sil/:id", budgetItemDelete);
router.get("/butce-sorgula/:date", budgetItemQuery);

//Budget Category
const {
  budgetItemCategoryAdd,
  budgetItemCategoryDelete,
  budgetItemCategoryQuery,
} = require("../controllers/budgets/budgetItemCategories");
router.post("/category-ekle", budgetItemCategoryAdd);
router.delete("/category-sil/:id", budgetItemCategoryDelete);
router.get("/category-sorgula", budgetItemCategoryQuery);

//Investments
const {
  investmentQuery,
  investmentPurchase,
  investmentSell,
  investmentDelete,
} = require("../controllers/investments/investment");
router.post("/yatirim-alis-ekle", investmentPurchase);
router.post("/yatirim-satis-ekle", investmentSell);
router.delete("/yatirim-islem-sil/:id", investmentDelete);
router.get("/yatirim-islem-sorgula/:date", investmentQuery);

//Investments Records
const {
  recordQuery,
  recordDelete,
} = require("../controllers/investments/record");
router.get("/gecmis-islem-sorgula/:date", recordQuery);
router.delete("/gecmis-islem-sil/:id", recordDelete);

//Investments Portfolio
const {
  portfolioQuery,
  portfolioAdd,
  portfolioDelete,
} = require("../controllers/investments/portfolio");
router.post("/portfoy-ekle", portfolioAdd);
router.delete("/portfoy-sil/:id", portfolioDelete);
router.get("/portfoy-sorgula", portfolioQuery);

//Investement Summary
const { presentPositions } = require("../controllers/investments/summary");
router.get("/guncel-durum", presentPositions);

//Investment Present Values
const {
  presentValueQuery,
  presentValueQueryAndUpdate,
} = require("../controllers/investments/presentValue");
router.get("/guncel-deger-sorgula", presentValueQuery);
router.post("/guncel-deger-guncelle", presentValueQueryAndUpdate);

//User ve Auth const { postUser, authUser } = require("../controllers/user/userIslemleri");
const { postUser, authUser } = require("../controllers/user/userIslemleri");
router.post("/postUser", postUser);
router.post("/authUser", authUser);

//MongoDb Queries
const {
  mongoQuery,
  mongoUpdate,
} = require("../controllers/mongoQuery/mongoQueries");
router.post("/dbupdate", mongoUpdate);
router.get("/dbsorgu", mongoQuery);

module.exports = router;
