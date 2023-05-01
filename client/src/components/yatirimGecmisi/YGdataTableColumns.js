import {dateFormat} from "../../utils/help-functions"
import YGdataTableIslem from "./YGdataTableIslem";

export const YGdataTableColumns = [
  {
    field: "portfoy",
    headerName: "Portföy",
    width: 200,
  },
  {
    field: "kod",
    headerName: "Kod",
    width: 50,
  },
  {
    field: "adet",
    headerName: "Adet",
    width: 80,
    filterable:false
  },
  {
    field: "alis_tarihi",
    headerName: "Alış Tarihi",
    width: 100,
    valueFormatter: (params) => dateFormat(params.value),
  },
  {
    field: "alis_fiyat",
    headerName: "Alış Fiyatı",
    width: 100,
  },
  {
    field: "satis_tarihi",
    headerName: "Satış Tarihi",
    width: 100,
    valueFormatter: (params) => dateFormat(params.value),
  },
  {
    field: "satis_fiyat",
    headerName: "Satış Fiyatı",
    width: 100,
  },
  {
    field: "kar_zarar",
    headerName: "Kar/Zarar Tutarı",
    width: 120,
  },
  {
    field: "kar_zarar_orani",
    headerName: "Kar/Zarar Oranı",
    width: 120,
  },
  {
    field: "gun_farki",
    headerName: "Gün Sayısı",
    width: 80,
  },
  {
    field: "actions",
    headerName: "İşlemler",
    type:"actions",
    width: 80,
    renderCell: params => <YGdataTableIslem {...{params}}/>
  },

];