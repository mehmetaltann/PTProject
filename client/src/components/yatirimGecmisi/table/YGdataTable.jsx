import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { dateFormat } from "../../../utils/help-functions";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Stack, Typography } from "@mui/material";
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
      headerAlign: "left",
      align: "left",
      width: 215,
    },
    {
      field: "kod",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 40,
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
      field: "alis_tarihi",
      headerName: "Alış Tarihi",
      headerAlign: "left",
      align: "left",
      type: "date",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "alis_fiyat",
      headerName: "Alış Fiyatı",
      headerAlign: "left",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
    },
    {
      field: "satis_tarihi",
      headerName: "Satış Tarihi",
      headerAlign: "left",
      align: "left",
      type: "date",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "satis_fiyat",
      type: "number",
      headerName: "Satış Fiyatı",
      headerAlign: "left",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
    },
    {
      field: "kar_zarar",
      headerName: "Kar/Zarar",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.kar_zarar >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`${params.row.kar_zarar.toFixed(2)} TL`}</Typography>
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
            >{`${params.row.kar_zarar.toFixed(2)} TL`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "kar_zarar_orani",
      headerName: "Yüzde",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.kar_zarar_orani >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
            >{`% ${params.row.kar_zarar_orani.toFixed(2)}`}</Typography>
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
            >{`% ${params.row.kar_zarar_orani.toFixed(2)}`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gun_farki",
      headerName: "Gün Sayısı",
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
      headerAlign: "right",
      align: "right",
      width: 60,
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return <DataTableFrame columns={columns} rows={historyIslemleri} />;
};

export default YGdataTable;
