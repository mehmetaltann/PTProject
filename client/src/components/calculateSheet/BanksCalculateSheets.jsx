import {
  DataSheetGrid,
  floatColumn,
  textColumn,
  keyColumn,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";
import { useState, useEffect } from "react";

const harcamaList = [
  "market",
  "car",
  "clothes",
  "healty",
  "meal",
  "home",
  "fun",
  "edu",
  "subs",
  "cake",
  "other",
];

const BanksCalculateSheets = () => {
  const [data, setData] = useState([
    { bank: "VakıfBank" },
    { bank: "Yapıkredi" },
    { bank: "FinansBank" },
  ]);

  useEffect(() => {
    data.map((banksItem) => {
      for (var i of harcamaList) {
        if (banksItem[i]) intsData[0][i] += banksItem[i];
      }
      console.log(intsData);
    });

  }, [data]);

  console.log(data);

  const [intsData, setIntsData] = useState([
    {
      bank: "Toplam",
      market: 0,
      car: 0,
      clothes: 0,
      healty: 0,
      meal: 0,
      home: 0,
      fun: 0,
      edu: 0,
      subs: 0,
      cake: 0,
      other: 0,
    },
  ]);

  function AddRows({ addRows }) {
    const column2 = [
      { ...keyColumn("bank", textColumn), title: "Banka" },
      { ...keyColumn("market", floatColumn), title: "Market" },
      { ...keyColumn("car", floatColumn), title: "Araba" },
      { ...keyColumn("clothes", floatColumn), title: "Giyim" },
      { ...keyColumn("healty", floatColumn), title: "Sağlık" },
      { ...keyColumn("meal", floatColumn), title: "Hazır Yemek" },
      { ...keyColumn("home", floatColumn), title: "Ev Eşyası" },
      { ...keyColumn("fun", floatColumn), title: "Eğlence - Oyun" },
      { ...keyColumn("edu", floatColumn), title: "Eğitim - Kitap" },
      { ...keyColumn("subs", floatColumn), title: "Abonelikler" },
      { ...keyColumn("cake", floatColumn), title: "Pastacılık" },
      { ...keyColumn("other", floatColumn), title: "Diğer" },
    ];

    return (
      <DataSheetGrid
        value={intsData}
        onChange={setIntsData}
        columns={column2}
        rowHeight={35}
        lockRows
        headerRowHeight={0}
      />
    );
  }

  const columns = [
    { ...keyColumn("bank", textColumn), title: "Banka" },
    { ...keyColumn("market", floatColumn), title: "Market" },
    { ...keyColumn("car", floatColumn), title: "Araba" },
    { ...keyColumn("clothes", floatColumn), title: "Giyim" },
    { ...keyColumn("healty", floatColumn), title: "Sağlık" },
    { ...keyColumn("meal", floatColumn), title: "Hazır Yemek" },
    { ...keyColumn("home", floatColumn), title: "Ev Eşyası" },
    { ...keyColumn("fun", floatColumn), title: "Eğlence - Oyun" },
    { ...keyColumn("edu", floatColumn), title: "Eğitim - Kitap" },
    { ...keyColumn("subs", floatColumn), title: "Abonelikler" },
    { ...keyColumn("cake", floatColumn), title: "Pastacılık" },
    { ...keyColumn("other", floatColumn), title: "Diğer" },
  ];

  return (
    <DataSheetGrid
      value={data}
      onChange={setData}
      columns={columns}
      rowHeight={35}
      headerRowHeight={50}
      addRowsComponent={AddRows}
    />
  );
};

export default BanksCalculateSheets;
