import CustomNoRowsOverlay from "../UI/table/CustomNoRowsOverlay";
import { useState, useMemo } from "react";

const YPdataTable = ({ selectedPortfoy }) => {
  const [data, setData] = useState([]);

  const filteredData = data.filter(
    (item) => item.portfoy_ismi === selectedPortfoy
  );

  const COLUMNS = [
    {
      field: "portfoy",
      headerName: "Portföy",
      flex: 1.2,
    },
    {
      flex: 1,
      field: "kod",
      headerName: "Kod",
      headerAlign: "center",
      align: "center",
    },
    {
      flex: 1,
      field: "adet",
      headerName: "Adet",
      type: "number",
      filterable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return <div>YPdataTable</div>;
};

export default YPdataTable;
