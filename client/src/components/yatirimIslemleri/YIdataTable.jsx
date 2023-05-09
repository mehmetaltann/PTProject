import CustomNoRowsOverlay from "../UI/table/CustomNoRowsOverlay";
import { useMemo, useState } from "react";
import { dateFormat } from "../../utils/help-functions";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { Badge, IconButton } from "@mui/material";
import { useYatirimContext } from "../../context/yatirimContext";
import DeleteIcon from "@mui/icons-material/Delete";

const YIdataTable = ({ data }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { yatirimKalemiSil } = useYatirimContext();

  const COLUMNS = [
    {
      field: "badge",
      filterable: false,

      sortable: false,
      width: 50,
      align: "center",
      renderCell: (params) =>
        params.row.islem === "Alış" ? (
          <Badge color="success" overlap="circular" badgeContent=" " />
        ) : (
          <Badge color="error" overlap="circular" badgeContent=" " />
        ),
    },
    {
      field: "action",
      headerName: "İşlem Tipi",
      width: 80,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "kod",
      headerName: "Kod",
      align: "center",
      headerAlign: "center",
      width: 80,
      flex: 0.8,
    },
    {
      field: "date",
      headerName: "Tarih",
      align: "center",
      headerAlign: "center",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
      flex: 1,
    },
    {
      field: "adet",
      headerName: "Adet",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "number",
      filterable: false,
      flex: 0.8,
    },
    {
      field: "fiyat",
      headerName: "Fiyat",
      align: "center",
      headerAlign: "center",
      type: "number",
      width: 100,
      valueFormatter: ({ value }) => `${value} TL`,
      flex: 1,
    },
    {
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      align: "center",
      headerAlign: "center",
      width: 100,
      valueFormatter: ({ value }) => `${value} TL`,
      flex: 1,
    },
    {
      field: "totalCost",
      type: "number",
      headerName: "Toplam Maliyet",
      width: 120,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.adet * params.row.fiyat + params.row.komisyon,
      valueFormatter: ({ value }) => `${value} TL`,
      flex: 1,
    },
    {
      field: "actions",
      width: 80,
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            size="small"
            color="error"
            onClick={() => yatirimKalemiSil(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      filterable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataGrid
      columns={columns}
      rows={data}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
      initialState={{
        ...data.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection
    />
  );
};

export default YIdataTable;
