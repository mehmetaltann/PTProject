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
  yatirimIslemiSil,
  yatirimIslemiSorgula,
  yatirimAlisIslemiEkle,
  yatirimSatisIslemiEkle,
} = require("../controllers/yatirim/yatirimIslemleri");
router.post("/yatirim-alis-ekle", yatirimAlisIslemiEkle);
router.post("/yatirim-satis-ekle", yatirimSatisIslemiEkle);
router.delete("/yatirim-islem-sil/:id", yatirimIslemiSil);
router.get("/yatirim-islem-sorgula/:date", yatirimIslemiSorgula);

//Geçmiş Yatırım İşlemleri Rotaları
const {
  gecmisIslemSorgula,
  gecmisIslemEkle,
  gecmisIslemSil,
} = require("../controllers/yatirim/yatirimGecmisIslemler");
router.get("/gecmis-islem-sorgula/:date", gecmisIslemSorgula);
router.delete("/gecmis-islem-sil/:id", gecmisIslemSil);
router.post("/gecmis-islem-ekle", gecmisIslemEkle);

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
