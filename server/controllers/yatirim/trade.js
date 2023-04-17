const { acikPoziyonSorgu } = require("./queries");
const { acikPoziyonUpdate } = require("./updates");
const { gecmisIslemEkle } = require("./gecmisIslemler");

exports.tradeTransection = async (
  kod,
  satılanAdet,
  fiyat,
  tarih,
  komisyon,
  alimlist
) => {
  while (satılanAdet > 0) {
    let secilenAlim = alimlist[0];
    let secilenAlimAdet = Number(Number(secilenAlim.adet).toFixed(8));
    satılanAdet = Number(Number(satılanAdet).toFixed(8));

    if (secilenAlimAdet === satılanAdet) {
      await acikPoziyonUpdate("Kapalı", 0, secilenAlim.id, tarih);
      await gecmisIslemEkle(
        kod,
        satılanAdet,
        secilenAlim.id,
        secilenAlim.date,
        secilenAlim.fiyat,
        tarih,
        fiyat,
        komisyon
      );
      satılanAdet = 0;
    } else if (secilenAlimAdet > satılanAdet) {
      secilenAlimAdet -= satılanAdet;
      await acikPoziyonUpdate(
        "Güncellendi",
        secilenAlimAdet,
        secilenAlim.id,
        tarih
      );
      await gecmisIslemEkle(
        kod,
        satılanAdet,
        secilenAlim.id,
        secilenAlim.date,
        secilenAlim.fiyat,
        tarih,
        fiyat,
        komisyon
      );
      satılanAdet = 0;
    } else {
      await acikPoziyonUpdate("Kapalı", 0, secilenAlim.id, tarih);
      await gecmisIslemEkle(
        kod,
        satılanAdet,
        secilenAlim.id,
        secilenAlim.date,
        secilenAlim.fiyat,
        tarih,
        fiyat,
        komisyon
      );
      satılanAdet -= secilenAlimAdet;
      alimlist.splice(0, 1);
    }
  }
};
