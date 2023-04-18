import { TableLayout } from "../../../styles/TableLayout";
import TableHeader from "../../UI/Table/TableHeader";
import TableBody from "./TableBody";

const headerList = [
  "Portföy",
  "Kod",
  "Adet",
  "Alım Tarihi",
  "Alım Fiyatı",
  "Satış Tarihi",
  "Satış Fiyatı",
  "Kar/Zarar Tutarı",
  "Kar/Zarar Oranı",
  "Gün Sayısı"
];

const Table = () => {
  return (
    <TableLayout>
      <TableHeader header_list={headerList} />
      <TableBody />
    </TableLayout>
  );
};

export default Table;
