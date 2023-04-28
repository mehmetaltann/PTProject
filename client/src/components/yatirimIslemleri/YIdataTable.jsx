import { useMemo } from "react";
import { dateFormat } from "../../utils/help-functions";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useCallback } from "react";
import { useYatirimContext } from "../../context/yatirimContext";
import DeleteIcon from "@mui/icons-material/Delete";

const YIdataTable = () => {
  const { islemler, yatirimIslemiSil } = useYatirimContext();
  const COLUMNS = [
    {
      field: "islem",
      headerName: "İşlem Tipi",
      width: 100,
    },
    {
      field: "kod",
      headerName: "Kod",
      width: 100,
    },
    {
      field: "tarih",
      headerName: "Tarih",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "adet",
      headerName: "Adet",
      width: 100,
      type: "number",
      filterable: false,
    },
    {
      field: "fiyat",
      headerName: "Fiyat",
      type: "number",
      width: 100,
    },
    {
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      width: 100,
    },
    {
      field: "totalCost",
      type: "number",
      headerName: "Toplam Maliyet",
      width: 200,
      valueGetter: (params) =>
        params.row.adet * params.row.fiyat + params.row.komisyon,
    },
    {
      field: "actions",
      width: 80,
      renderCell: (params) => {
        return (
          <IconButton
            size="small"
            color="error"
            onClick={() => yatirimIslemiSil(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 0.2,
      bottom: params.isLastVisible ? 0 : 0.2,
    };
  }, []);

  return (
    <Box sx={{ height: 450, width: "auto" }}>
      <DataGrid
        columns={columns}
        rows={islemler}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        getRowSpacing={getRowSpacing}
        rowSpacingType="border"
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default YIdataTable;
