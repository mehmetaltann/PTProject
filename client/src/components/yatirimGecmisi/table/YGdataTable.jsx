import CustomNoRowsOverlay from "../../UI/table/CustomNoRowsOverlay";
import DeleteIcon from "@mui/icons-material/Delete";
import useHttp from "../../../hooks/use-http";
import { dateFormat } from "../../../utils/help-functions";
import { useMemo, useEffect, useState } from "react";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { useYGContext } from "../store/ygContext";

const YGdataTable = () => {
  const [data, setData] = useState([]);
  const { gecmisIslemSil, selectedDate } = useYGContext();
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
        url: `gecmis-islem-sorgula/${selectedDate}`,
      },
      transformData
    );
  }, [selectedDate, gecmisIslemSil]);

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
              gecmisIslemSil(params.row.id);
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
      initialState={{
        ...data.initialState,
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
