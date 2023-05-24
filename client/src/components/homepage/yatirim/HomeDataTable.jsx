import CustomNoRowsOverlay from "../../UI/table/CustomNoRowsOverlay";
import { useMemo, useEffect } from "react";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Badge, IconButton, Stack, Typography } from "@mui/material";

const HomeDataTable = () => {
  const { guncelDurum } = useSelector((state) => state.guncelDurum);
  const { selectedPortfoy } = useSelector((state) => state.portfoy);

  const COLUMNS = [
    {
      field: "kod",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 60,
      sortable: false,
      filterable: false,
    },
    {
      field: "title",
      headerName: "Fon Adı",
      headerAlign: "left",
      align: "left",
      width: 250,
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        params.value
          ? params.value.toString().slice(0, 20) +
            (params.value.toString().length > 20 ? "..." : " ")
          : params.value,
      cellClassName: "fon_adi",
    },
    {
      field: "adet",
      type: "number",
      headerName: "Adet",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ort_fiyat",
      headerName: "Ort. Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gnc_fiyat",
      headerName: "Güncel Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "toplam_maliyet",
      headerName: "Toplam Maliyet",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "toplam_tutar",
      headerName: "Toplam Değer",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "kar_yuzdesi",
      headerName: "Yüzde",
      type: "number",
      valueFormatter: ({ value }) => `% ${value.toFixed(2)}`,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataGrid
      columns={columns}
      rows={guncelDurum}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      density="compact"
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      sx={{
        "& .fon_adi": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
        },
      }}
    />
  );
};

export default HomeDataTable;
