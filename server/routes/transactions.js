const { gelirEkle, gelirSorgula, gelirSil } = require("../controllers/gelir");
const { giderEkle, giderSorgula, giderSil } = require("../controllers/gider");
const { butceDataEkle } = require("../controllers/butceDataEkle");
const { butceDataSil } = require("../controllers/butceDataSil");
const { butceSorgula } = require("../controllers/butceSorgu");
const router = require("express").Router();

router.post("/gelir-ekle", gelirEkle);
router.get("/gelir-getir/:tarih/:category", gelirSorgula);
router.delete("/gelir-sil/:id", gelirSil);

router.post("/gider-ekle", giderEkle);
router.get("/gider-getir/:tarih/:category", giderSorgula);
router.delete("/gider-sil/:id", giderSil);

router.post("/butce-veri-ekle/:type", butceDataEkle);
router.delete("/butce-veri-sil/:id", butceDataSil);
router.get("/butce-getir/:tarih/:category", butceSorgula);

module.exports = router;
