import CustomNoRowsOverlay from "../../UI/table/CustomNoRowsOverlay";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormat } from "../../../utils/help-functions";
import { useMemo, useEffect } from "react";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistoryIslemleri,
  deleteHistoryIslemleri,
} from "../../../redux/historiesSlice";

const YGdataTable = () => {
  const { historyIslemleri, tarihAraligi, degisim } = useSelector(
    (state) => state.history
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryIslemleri());
  }, [tarihAraligi, degisim, dispatch]);

  const COLUMNS = [
    {
      field: "portfoy",
      headerName: "Portföy",
      flex: 1.2,
    },
    {
      field: "kod",
      headerName: "Kod",
      flex: 0.6,
    },
    {
      field: "adet",
      headerName: "Adet",
      width: 80,
      filterable: false,
      flex: 1,
    },
    {
      field: "alis_tarihi",
      headerName: "Alış Tarihi",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
      flex: 1,
    },
    {
      field: "alis_fiyat",
      headerName: "Alış Fiyatı",
      width: 100,
      flex: 1,
    },
    {
      field: "satis_tarihi",
      headerName: "Satış Tarihi",
      valueFormatter: (params) => dateFormat(params.value),
      flex: 1,
    },
    {
      field: "satis_fiyat",
      headerName: "Satış Fiyatı",
      flex: 1,
    },
    {
      field: "kar_zarar",
      headerName: "Kar/Zarar Tutarı",
      flex: 1,
    },
    {
      field: "kar_zarar_orani",
      headerName: "Kar/Zarar Oranı",
      flex: 1,
    },
    {
      field: "gun_farki",
      headerName: "Gün Sayısı",
      flex: 1,
    },
    {
      field: "actions",
      flex: 1,
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              dispatch(deleteHistoryIslemleri(params.row.id));
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
      rows={historyIslemleri}
      density="compact"
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      initialState={{
        ...historyIslemleri.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
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
    />
  );
};

export default YGdataTable;
