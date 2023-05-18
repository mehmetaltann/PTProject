import CustomNoRowsOverlay from "../../UI/table/CustomNoRowsOverlay";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useEffect } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getYatirimIslemleri,
  deleteYatirimIslemleri,
} from "../../../redux/yatirimSlice";

const YIdataTable = () => {
  const { yatirimIslemleri, tarihAraligi, degisim } = useSelector(
    (state) => state.yatirim
  );
  const { selectedPortfoy } = useSelector((state) => state.portfoy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getYatirimIslemleri());
  }, [tarihAraligi, degisim]);

  const filteredData = yatirimIslemleri.filter(
    (item) => item.portfoy_ismi === selectedPortfoy
  );

  const COLUMNS = [
    {
      flex: 1,
      field: "action",
      headerName: "İşlem Tipi",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.action === "Alış" ? (
          <Stack
            direction="row"
            spacing={3}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Badge
              color="success"
              overlap="circular"
              badgeContent=""
              size="small"
            />
            <Typography>Alış</Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={3}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Badge
              color="error"
              overlap="circular"
              badgeContent=""
              size="small"
            />
            <Typography>Satış</Typography>
          </Stack>
        ),
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
      field: "date",
      headerName: "Tarih",
      valueFormatter: (params) => dateFormat(params.value),
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
    {
      flex: 1,
      field: "fiyat",
      headerName: "Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      flex: 1,
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      valueFormatter: ({ value }) => `${value} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      flex: 1,
      field: "totalCost",
      type: "number",
      headerName: "Toplam Maliyet",
      valueGetter: (params) =>
        params.row.adet * params.row.fiyat + params.row.komisyon,
      valueFormatter: ({ value }) => `${value} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      flex: 1,
      field: "",
      headerName: "Güncel Değer",
      type: "number",
      valueFormatter: ({ value }) => `${value} TL`,
      headerAlign: "center",
      align: "center",
    },
    {
      flex: 1,
      field: "actions",
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => dispatch(deleteYatirimIslemleri(params.row.id))}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      filterable: false,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataGrid
      columns={columns}
      rows={filteredData}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      density="compact"
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
      initialState={{
        ...filteredData.initialState,
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
