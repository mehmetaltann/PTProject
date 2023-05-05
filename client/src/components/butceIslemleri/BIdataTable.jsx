import useAxios from "../../hooks/useAxios";
import CustomNoRowsOverlay from "../UI/CustomNoRowsOverlay";
import BIdataTableFooter from "./BIdataTableFooter";
import { useMemo, useState, useEffect } from "react";
import { dateFormat } from "../../utils/help-functions";
import { Badge, Box } from "@mui/material";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const BIdataTable = ({ selectedDate }) => {
  const [data, setData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const { response } = useAxios({
    method: "get",
    url: `butce-sorgula/${selectedDate}`,
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  const filteredData = data.map(({ _id: id, ...rest }) => ({
    id,
    ...rest,
  }));

  const COLUMNS = [
    {
      field: "Tip",
      width: 50,
      align: "center",
      renderCell: (params) =>
        params.row.type === "Gelir" ? (
          <Badge color="success" overlap="circular" badgeContent=" " />
        ) : (
          <Badge color="error" overlap="circular" badgeContent=" " />
        ),
    },
    { flex: 1, field: "title", headerName: "İşlem", width: 150 },
    { flex: 1, field: "categoryA", headerName: "Kategori A", width: 150 },
    { flex: 1, field: "categoryB", headerName: "Kategori B", width: 150 },
    {
      flex: 1,
      field: "date",
      headerName: "Tarih",
      width: 120,
      type: "date",
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      flex: 1,
      field: "amount",
      headerName: "Tutar",
      type: "number",
      width: 150,
      valueFormatter: (params) => `${params.value} TL`,
      headerAlign: "left",
      align: "left",
    },
    { flex: 1, field: "description", headerName: "Açıklama", width: 150 },
  ];
  const columns = useMemo(() => COLUMNS, []); 
  return (
    <DataGrid
    getRowHeight={() => 'auto'}
      columns={columns}
      rows={filteredData}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
        footer: BIdataTableFooter,
      }}
      slotProps={{
        footer: { filteredData, rowSelectionModel },
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection
    />
  );
};

export default BIdataTable;
