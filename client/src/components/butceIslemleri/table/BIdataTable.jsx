import CustomNoRowsOverlay from "../../UI/table/CustomNoRowsOverlay";
import BIdataTableFooter from "./BIdataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import useHttp from "../../../hooks/use-http";
import { useMemo, useState, useEffect } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { Badge, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { useButceContext } from "../store/butceContext";

const BIdataTable = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [data, setData] = useState([]);
  const { butceKalemiSil, selectedDate, butceKalemiEkle } = useButceContext();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const transformData = (fetchData) => {
      let filteredData = fetchData.map(({ _id: id, ...rest }) => ({
        id,
        ...rest,
      }));
      setData(filteredData);
    };

    sendRequest(
      {
        method: "get",
        url: `butce-sorgula/${selectedDate}`,
      },
      transformData
    );
  }, [selectedDate, butceKalemiEkle, butceKalemiSil]);

  const COLUMNS = [
    {
      flex: 0.4,
      field: "Tip",
      align: "center",
      renderCell: (params) =>
        params.row.type === "Gelir" ? (
          <Badge color="success" overlap="circular" badgeContent=" " />
        ) : (
          <Badge color="error" overlap="circular" badgeContent=" " />
        ),
    },
    { flex: 1, field: "title", headerName: "Gider" },
    { flex: 1, field: "categoryA", headerName: "Kategori A" },
    { flex: 1, field: "categoryB", headerName: "Kategori B" },
    {
      flex: 1,
      field: "date",
      headerName: "Tarih",

      type: "date",
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      flex: 1,
      field: "amount",
      headerName: "Tutar",
      type: "number",

      valueFormatter: (params) => `${params.value} TL`,
      headerAlign: "left",
      align: "left",
    },
    { flex: 1, field: "description", headerName: "Açıklama" },
    {
      flex: 0.4,
      field: "actions",

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
