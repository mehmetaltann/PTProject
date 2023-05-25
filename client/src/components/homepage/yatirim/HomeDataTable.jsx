import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";

const HomeDataTable = () => {
  const { guncelDurum } = useSelector((state) => state.guncelDurum);
  const { selectedPortfoy } = useSelector((state) => state.portfoy);

  const filteredData =
    selectedPortfoy !== "Tümü"
      ? guncelDurum.filter((item) => item.portfoy === selectedPortfoy)
      : guncelDurum;

  const COLUMNS = [
    {
      field: "kod",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 40,
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
      cellClassName: "fon_adi",
    },
    {
      field: "adet",
      type: "number",
      width: 60,
      headerName: "Adet",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ort_fiyat",
      headerName: "Ort. Fiyat",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gnc_fiyat",
      headerName: "Güncel Fiyat",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "toplam_maliyet",
      headerName: "Top. Maliyet",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "toplam_tutar",
      headerName: "Top. Değer",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "toplam_kar",
      headerName: "Kar/Zarar",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.toplam_kar >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`${params.row.toplam_kar.toFixed(2)} TL`}</Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <SouthIcon sx={{ color: "error.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "error.main" }}
            >{`${params.row.toplam_kar.toFixed(2)} TL`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "kar_yuzdesi",
      headerName: "Yüzde",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.kar_yuzdesi >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`% ${params.row.kar_yuzdesi.toFixed(2)}`}</Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <SouthIcon sx={{ color: "error.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "error.main" }}
            >{`% ${params.row.kar_yuzdesi.toFixed(2)}`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      density="standard"
      sxProps={{
        "& .fon_adi": {
          whiteSpace: "normal !important",
          lineHeight: "normal !important",
        },
      }}
    />
  );
};

export default HomeDataTable;
