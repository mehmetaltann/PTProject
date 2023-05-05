const router = require("express").Router();

//Bütçe Rotaları
const { butceDataEkle } = require("../controllers/butce/butceDataEkle");
const { butceSorgula } = require("../controllers/butce/butceSorgu");
const {
  butceIslemSorgula,
  butceIslemSil,
} = require("../controllers/butce/butceIslemler");
router.post("/butce-veri-ekle/:type", butceDataEkle);
router.delete("/butce-veri-sil/:id", butceIslemSil);
router.get("/butce-getir/:tarih/:category", butceSorgula);
router.get("/butce-sorgula/:date", butceIslemSorgula);

//Yatırım İşlemleri Rotaları
const { islemEkle, islemSil } = require("../controllers/yatirim/islemler");
const { islemSorgula } = require("../controllers/yatirim/queries");
router.post("/yatirim-islem", islemEkle);
router.delete("/yatirim-islem-sil/:id", islemSil);
router.get("/yatirim-islem-sorgula", islemSorgula);

//Geçmiş Yatırım İşlemleri Rotaları
const { gecmisIslemSorgula } = require("../controllers/yatirim/gecmisIslemler");
router.get("/gecmis-islem-sorgula", gecmisIslemSorgula);

//Portfoy İşlemleri Rotaları
const {
  portfoyEkle,
  portfoySil,
  portfoySorgula,
} = require("../controllers/portfoy/prtfyIslemleri");
router.post("/portfoy-ekle", portfoyEkle);
router.delete("/portfoy-sil/:id", portfoySil);
router.get("/portfoy-sorgula", portfoySorgula);

//Kategori İşlemleri Rotaları
const {
  categorySorgula,
  categoryEkle,
  categorySil,
} = require("../controllers/category/ctgryIslemleri");
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
