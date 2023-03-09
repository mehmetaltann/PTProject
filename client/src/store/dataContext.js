import { createContext } from "react";

export const DataContext = createContext();

const yatirimData = [
  {
    kod: "HSA",
    isim: "HSBC PORTFÖY DEĞİŞKEN (TL) FON",
    adet: 3,
    birim_fiyat: 7.2546,
    alim_birim_fiyat: 4.2568,
    komisyon: 0,
    alim_tairhi: "12.05.2022",
  },
  {
    kod: "TCD",
    isim: "TACİRLER PORTFÖY DEĞIŞKEN FON",
    adet: 100,
    birim_fiyat: 6.97,
    alim_birim_fiyat: 3.243,
    komisyon: 0,
    alim_tairhi: "12.07.2022",
  },
  {
    kod: "NNF",
    isim: "HEDEF PORTFÖY BİRİNCİ HİSSE SENEDİ (TL) FONU (HİSSE SENEDİ YOĞUN FON)",
    adet: 708,
    birim_fiyat: 2.83,
    alim_birim_fiyat: 1.2,
    komisyon: 0,
    alim_tairhi: "12.05.2022",
  },
  {
    kod: "TI3",
    isim: "İŞ PORTFÖY İŞ BANKASI İŞTİRAKLERİ ENDEKSİ HİSSE SENEDİ (TL) FONU (HİSSE SENEDİ YOĞUN FON)",
    adet: 4,
    birim_fiyat: 194.25,
    alim_birim_fiyat: 195,
    komisyon: 0,
    alim_tairhi: "12.11.2021",
  }
];
