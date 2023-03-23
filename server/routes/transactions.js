const { butceDataEkle } = require("../controllers/butceDataEkle");
const { butceDataSil } = require("../controllers/butceDataSil");
const { butceSorgula } = require("../controllers/butceSorgu");
const router = require("express").Router();

router.post("/butce-veri-ekle/:type", butceDataEkle);
router.delete("/butce-veri-sil/:id", butceDataSil);
router.get("/butce-getir/:tarih/:category", butceSorgula);

module.exports = router;
