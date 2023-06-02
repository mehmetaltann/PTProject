import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  createAddRowsComponent,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";
import { useState } from "react";

const BaseCalculateSheet = () => {
  const [data, setData] = useState([{ market: 255, car: 135 }]);

  const columns = [
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
  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  return (
    <DataSheetGrid
      value={data}
      onChange={setData}
      columns={columns}
      addRowsComponent={AddRows}
      height={700}
      rowHeight={35}
      headerRowHeight={50}
      autoAddRow
    />
  );
};

export default BaseCalculateSheet;
