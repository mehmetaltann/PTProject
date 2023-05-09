import CustomNoRowsOverlay from "../UI/table/CustomNoRowsOverlay";
import BIdataTableFooter from "./BIdataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useState, useEffect } from "react";
import { dateFormat } from "../../utils/help-functions";
import { Badge, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { useGlobalContext } from "../../context/globalContext";

const BIdataTable = ({ data }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { butceKalemiSil } = useGlobalContext();

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
    {
      field: "actions",
      width: 80,
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              butceKalemiSil(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      filterable: false,
      sortable: false,
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataGrid
      columns={columns}
      rows={data}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
        footer: BIdataTableFooter,
      }}
      slotProps={{
        footer: { data, rowSelectionModel },
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
      initialState={{
        ...data.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
      rowSelectionModel={rowSelectionModel}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection
    />
  );
};

export default BIdataTable;
