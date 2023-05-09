const router = require("express").Router();

//Bütçe Rotaları
const {
  butceIslemSorgula,
  butceIslemSil,
  butceIslemEkle,
} = require("../controllers/butce/butceIslemler");
router.post("/butce-veri-ekle", butceIslemEkle);
router.delete("/butce-veri-sil/:id", butceIslemSil);
router.get("/butce-sorgula/:date", butceIslemSorgula);

//Yatırım İşlemleri Rotaları
const {
  yatirimIslemSil,
  yatirimIslemSorgula,
  yatirimAlisIslemEkle,
  yatirimSatisIslemEkle,
} = require("../controllers/yatirim/yatirimIslemler");
router.post("/yatirim-alis-ekle", yatirimAlisIslemEkle);
router.post("/yatirim-satis-ekle", yatirimSatisIslemEkle);
router.delete("/yatirim-islem-sil/:id", yatirimIslemSil);
router.get("/yatirim-islem-sorgula/:date", yatirimIslemSorgula);

//Geçmiş Yatırım İşlemleri Rotaları
const { gecmisIslemSorgula } = require("../controllers/yatirim/gecmisIslemler");
router.get("/gecmis-islem-sorgula", gecmisIslemSorgula);

//Portfoy İşlemleri Rotaları
const {
  portfoyEkle,
  portfoySil,
  portfoySorgula,
} = require("../controllers/yatirim/yatirimPrtfyIslemleri");
router.post("/portfoy-ekle", portfoyEkle);
router.delete("/portfoy-sil/:id", portfoySil);
router.get("/portfoy-sorgula", portfoySorgula);

//Kategori İşlemleri Rotaları
const {
  categorySorgula,
  categoryEkle,
  categorySil,
} = require("../controllers/butce/butcectgryIslemleri");
router.post("/category-ekle", categoryEkle);
router.delete("/category-sil/:id", categorySil);
router.get("/category-sorgula", categorySorgula);

//MongoDb Sorgu Rotaları
const {
  mongoSorgu,
  mongoUpdate,
} = require("../controllers/dbSorgu/mongoSorgu");
router.post("/dbupdate", mongoUpdate);
router.get("/dbsorgu", mongoSorgu);

module.exports = router;
