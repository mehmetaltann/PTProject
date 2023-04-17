const router = require("express").Router();

//Bütçe Rotaları
const { butceDataEkle } = require("../controllers/butce/butceDataEkle");
const { butceDataSil } = require("../controllers/butce/butceDataSil");
const { butceSorgula } = require("../controllers/butce/butceSorgu");
router.post("/butce-veri-ekle/:type", butceDataEkle);
router.delete("/butce-veri-sil/:id", butceDataSil);
router.get("/butce-getir/:tarih/:category", butceSorgula);

//Yatırım İşlemleri Rotaları
const { islemEkle, islemSil } = require("../controllers/yatirim/islemler");
const { islemSorgula } = require("../controllers/yatirim/queries");
router.post("/yatirim-islem", islemEkle);
router.delete("/yatirim-islem-sil/:id", islemSil);
router.get("/yatirim-islem-sorgula", islemSorgula);

//Portfoy İşlemleri Rotaları
const {
  portfoyEkle,
  portfoySil,
  portfoySorgula,
} = require("../controllers/portfoy/prtfyIslemleri");
router.post("/portfoy-ekle", portfoyEkle);
router.delete("/portfoy-sil/:id", portfoySil);
router.get("/portfoy-sorgula", portfoySorgula);

//MongoDb Sorgu Rotaları
const {
  mongoSorgu,
  mongoUpdate,
} = require("../controllers/dbSorgu/mongoSorgu");

router.post("/sorgu", mongoUpdate);
router.get("/sorgu2", mongoSorgu);

module.exports = router;
