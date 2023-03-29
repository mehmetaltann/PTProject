const { butceDataEkle } = require("../controllers/butceDataEkle");
const { butceDataSil } = require("../controllers/butceDataSil");
const { butceSorgula } = require("../controllers/butceSorgu");
const { mongoSorgu, mongoUpdate } = require("../controllers/mongoSorgu");
const { islemYap } = require("../controllers/yatirimIslemler");

const router = require("express").Router();

router.post("/butce-veri-ekle/:type", butceDataEkle);
router.delete("/butce-veri-sil/:id", butceDataSil);
router.get("/butce-getir/:tarih/:category", butceSorgula);

router.post("/sorgu", mongoUpdate);
router.get("/sorgu2", mongoSorgu);

router.post("/yatirim-islem", islemYap);

module.exports = router;
