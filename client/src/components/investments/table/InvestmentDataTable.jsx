import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useEffect } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getYatirimIslemleri,
  deleteYatirimIslemleri,
} from "../../../redux/yatirimSlice";

const InvestmentDataTable = () => {
  const { yatirimIslemleri, tarihAraligi, degisim } = useSelector(
    (state) => state.yatirim
  );

  const { selectedPortfolio } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getYatirimIslemleri());
  }, [tarihAraligi, degisim, dispatch]);

  const filteredData =
    selectedPortfolio !== "Tümü"
      ? yatirimIslemleri.filter((item) => item.portfolio === selectedPortfolio)
      : yatirimIslemleri;

  const columns = [
    {
      field: "code",
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
      field: "number",
      headerName: "Adet",
      type: "number",
      filterable: false,
      headerAlign: "left",
      align: "left",
      width: 70,
    },
    {
      field: "price",
      headerName: "Br. Fiyat",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 110,
    },
    {
      field: "commission",
      type: "number",
      headerName: "Komisyon",
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    {
      field: "cost",
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
      field: "presentvalue",
      headerName: "Gün. Değer",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 110,
    },
    {
      field: "plStatus",
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
      field: "plPercentage",
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
      field: "dayDiff",
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

  return <DataTableFrame columns={columns} rows={filteredData} />;
};

export default InvestmentDataTable;
