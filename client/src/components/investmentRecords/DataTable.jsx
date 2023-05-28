import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { dateFormat } from "../../utils/help-functions";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../redux/slices/generalSlice";
import {
  useGetRecordsQuery,
  useDeleteRecordMutation,
} from "../../redux/api/investmentRecordApi";
import {
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const DataTable = () => {
  const [deleteRecord] = useDeleteRecordMutation();
  const { selectedDate } = useSelector((state) => state.general);
  const {
    data: records,
    isLoading,
    isFetching,
  } = useGetRecordsQuery(selectedDate);
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const columns = [
    {
      field: "portfolio",
      headerName: "Portföy",
      headerAlign: "left",
      align: "left",
      width: 215,
    },
    {
      field: "code",
      headerName: "Kod",
      headerAlign: "left",
      align: "left",
      width: 40,
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
      field: "purchaseDate",
      headerName: "Alış Tarihi",
      headerAlign: "left",
      align: "left",
      type: "date",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "purchasePrice",
      headerName: "Alış Fiyatı",
      headerAlign: "left",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
    },
    {
      field: "saleDate",
      headerName: "Satış Tarihi",
      headerAlign: "left",
      align: "left",
      type: "date",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "salePrice",
      type: "number",
      headerName: "Satış Fiyatı",
      headerAlign: "left",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
    },
    {
      field: "plStatus",
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
      field: "plPercentage",
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
      field: "dateDiff",
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
            onClick={async () => {
              try {
                const res = await deleteRecord(params.row.id).unwrap();
                dispatch(setMessage(res));
              } catch (error) {
                console.log(error);
              }
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

  return <DataTableFrame columns={columns} rows={records} />;
};

export default DataTable;
