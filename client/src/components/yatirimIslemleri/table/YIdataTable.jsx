import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useEffect } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getYatirimIslemleri,
  deleteYatirimIslemleri,
} from "../../../redux/yatirimSlice";

const YIdataTable = () => {
  const { yatirimIslemleri, tarihAraligi, degisim, islemTipi } = useSelector(
    (state) => state.yatirim
  );
  const { selectedPortfoy } = useSelector((state) => state.portfoy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getYatirimIslemleri());
  }, [tarihAraligi, degisim, dispatch]);

  const filteredData =
    selectedPortfoy !== "Tümü"
      ? yatirimIslemleri.filter(
          (item) =>
            item.portfoy_ismi === selectedPortfoy && item.action === islemTipi
        )
      : yatirimIslemleri.filter((item) => item.action === islemTipi);

  const columns1 = [
    {
      field: "action",
      headerName: "İşlem Tipi",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) =>
        params.row.action === "Alış" ? (
          <Stack
            direction="row"
            spacing={3}
            sx={{
              ml: 1,
            }}
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
      field: "kod",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 40,
    },
    {
      field: "date",
      headerName: "Tarih",
      type: "date",
      valueFormatter: (params) => dateFormat(params.value),
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "adet",
      headerName: "Adet",
      type: "number",
      filterable: false,
      headerAlign: "left",
      align: "left",
      width: 70,
    },
    {
      field: "fiyat",
      headerName: "Br. Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 110,
    },
    {
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "totalCost",
      type: "number",
      headerName: "Maliyet",
      valueGetter: (params) =>
        params.row.adet * params.row.fiyat + params.row.komisyon,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 110,
    },
    {
      field: "islemGuncelDegeri",
      headerName: "Gün. Değer",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 110,
    },
    {
      field: "islemKarZarar",
      headerName: "Kar/Zarar",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.islemKarZarar >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`${params.row.islemKarZarar.toFixed(2)} TL`}</Typography>
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
            >{`${params.row.islemKarZarar.toFixed(2)} TL`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "islemKarZararYuzdesi",
      headerName: "Yüzde",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.islemKarZararYuzdesi >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`% ${params.row.islemKarZararYuzdesi.toFixed(2)}`}</Typography>
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
            >{`% ${params.row.islemKarZararYuzdesi.toFixed(2)}`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gun_farki",
      headerName: "Gün",
      type: "number",
      filterable: false,
      headerAlign: "center",
      align: "center",
      width: 60,
    },
    {
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
      width: 40,
      filterable: false,
      sortable: false,
      headerAlign: "right",
      align: "right",
    },
  ];

  const columns2 = [
    {
      field: "action",
      headerName: "İşlem Tipi",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) =>
        params.row.action === "Alış" ? (
          <Stack
            direction="row"
            spacing={3}
            sx={{
              ml: 2,
            }}
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
      field: "kod",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 40,
    },
    {
      field: "date",
      headerName: "Tarih",
      valueFormatter: (params) => dateFormat(params.value),
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "adet",
      headerName: "Adet",
      type: "number",
      filterable: false,
      headerAlign: "left",
      align: "left",
      width: 70,
    },
    {
      field: "fiyat",
      headerName: "Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 120,
    },
    {
      field: "komisyon",
      type: "number",
      headerName: "Komisyon",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 120,
    },
    {
      field: "totalCost",
      type: "number",
      headerName: "Toplam Maliyet",
      valueGetter: (params) =>
        params.row.adet * params.row.fiyat + params.row.komisyon,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 120,
    },
    {
      field: "islemGuncelDegeri",
      headerName: "Güncel Değer",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 120,
    },
    {
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
      headerAlign: "right",
      align: "right",
      width: 60,
    },
  ];

  return (
    <DataTableFrame
      columns={islemTipi === "Alış" ? columns1 : columns2}
      rows={filteredData}
    />
  );
};

export default YIdataTable;
