const { acikPoziyonUpdate } = require("./updates");
const { gecmisIslemEkle } = require("./gecmisIslemler");

exports.tradeTransection = async (satis_id, satilanAdet, alim_list) => {
  while (satilanAdet > 0) {
    let secilenAlim = alim_list[0];
    let secilenAlimIlkAdet = Number(Number(secilenAlim.adet).toFixed(8));
    satilanAdet = Number(Number(satilanAdet).toFixed(8));

    const dataArrange = async (islem_adet, durum, secilenAlimSonAdet) => {
      await acikPoziyonUpdate(secilenAlim.id, durum, secilenAlimSonAdet);
      await gecmisIslemEkle(islem_adet, satis_id, secilenAlim.id);
    };

    if (secilenAlimIlkAdet === satilanAdet) {
      await dataArrange(satilanAdet, "Kapalı", 0);
      satilanAdet = 0;
    } else if (secilenAlimIlkAdet > satilanAdet) {
      secilenAlimIlkAdet -= satilanAdet;
      await dataArrange(satilanAdet, "Güncellendi", secilenAlimIlkAdet);
      satilanAdet = 0;
    } else {
      await dataArrange(secilenAlimIlkAdet, "Kapalı", 0);
      satilanAdet -= secilenAlimIlkAdet;
      alim_list.splice(0, 1);
    }
  }
};
