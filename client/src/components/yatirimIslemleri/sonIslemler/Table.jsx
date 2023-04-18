import TableBody from "./TableBody";
import TableHeader from "../../UI/Table/TableHeader";
import { TableLayout } from "../../../styles/TableLayout";

const headerList = [
  "İşlem",
  "Kod",
  "Tarih",
  "Adet",
  "Fiyat",
  "Komisyon",
  "Toplam",
  "İşlem",
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
