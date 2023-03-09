const { gelirEkle, gelirSorgula, gelirSil } = require("../controllers/gelir");
const { giderEkle, giderSorgula, giderSil } = require("../controllers/gider");
const router = require("express").Router();

router.post("/gelir-ekle", gelirEkle);
router.get("/gelir-getir", gelirSorgula);
router.delete("/gelir-sil/:id", gelirSil);

router.post("/gider-ekle", giderEkle);
router.get("/gider-getir", giderSorgula);
router.delete("/gider-sil/:id", giderSil);

module.exports = router;
