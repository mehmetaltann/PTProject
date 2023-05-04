import { useMemo, useCallback } from "react";
import { dateFormat } from "../../utils/help-functions";
import { DataGrid } from "@mui/x-data-grid";
import { Badge, Box, IconButton } from "@mui/material";
import { useYatirimContext } from "../../context/yatirimContext";
import DeleteIcon from "@mui/icons-material/Delete";

const YIdataTable = () => {
  const { islemler, yatirimIslemiSil, selectedPortfoy } = useYatirimContext();

  const islemlerFiltered = islemler.filter(
    (islem) => islem.portfoy === selectedPortfoy
  );

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
      field: "islem",
      headerName: "İşlem Tipi",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "kod",
      headerName: "Kod",
      align: "center",
      headerAlign: "center",
      width: 80,
    },
    {
      field: "tarih",
      headerName: "Tarih",
      align: "center",
      headerAlign: "center",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "adet",
      headerName: "Adet",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "number",
      filterable: false,
    },
    {
      field: "fiyat",
      headerName: "Fiyat",
      align: "center",
      headerAlign: "center",
      type: "number",
      width: 100,
      valueFormatter: ({ value }) => `${value} TL`,
    },
    {
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      align: "center",
      headerAlign: "center",
      width: 100,
      valueFormatter: ({ value }) => `${value} TL`,
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
            onClick={() => yatirimIslemiSil(params.row.id)}
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

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 0.2,
      bottom: params.isLastVisible ? 0 : 0.2,
    };
  }, []);

  return (
    <Box sx={{ height: 400, width: "auto" }}>
      <DataGrid
        columns={columns}
        rows={islemlerFiltered}
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
