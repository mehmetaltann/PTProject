import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { dateFormat } from "../../utils/help-functions";
import { setSnackbar } from "../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetRecordsQuery,
  useDeleteRecordMutation,
} from "../../redux/apis/investmentRecordApi";
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
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      width: 215,
    },
    {
      field: "code",
      headerName: "Kod",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      width: 40,
      cellClassName: "boldandcolorcell",
    },
    {
      field: "number",
      headerName: "Adet",
      headerClassName: "header",
      type: "number",
      filterable: false,
      headerAlign: "left",
      align: "left",
      width: 70,
    },
    {
      field: "purchaseDate",
      headerName: "Alış Tarihi",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      type: "date",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "purchasePrice",
      headerName: "Alış Fiyatı",
      headerClassName: "header",
      headerAlign: "left",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
      cellClassName: "boldandcolorcell",
    },
    {
      field: "saleDate",
      headerName: "Satış Tarihi",
      headerClassName: "header",
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
      headerClassName: "header",
      headerAlign: "left",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      align: "left",
      width: 110,
      cellClassName: "boldandcolorcell",
    },
    {
      field: "plStatus",
      headerName: "Kar/Zarar",
      headerClassName: "header",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.plStatus >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main", fontWeight: 500 }}
            >{`${params.row.plStatus.toFixed(2)} TL`}</Typography>
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
              sx={{ color: "error.main", fontWeight: 500 }}
            >{`${params.row.plStatus.toFixed(2)} TL`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "plPercentage",
      headerName: "Yüzde",
      headerClassName: "header",
      type: "number",
      width: 110,
      renderCell: (params) =>
        params.row.plPercentage >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main", fontWeight: 500 }}
            >{`% ${params.row.plPercentage.toFixed(2)}`}</Typography>
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
              sx={{ color: "error.main", fontWeight: 500 }}
            >{`% ${params.row.plPercentage.toFixed(2)}`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "dateDiff",
      headerName: "Gün Sayısı",
      headerClassName: "header",
      type: "number",
      filterable: false,
      headerAlign: "center",
      align: "center",
      width: 60,
    },
    {
      field: "actions",
      headerName: "İşlem",
      headerClassName: "header",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteRecord(params.row.id).unwrap();
                dispatch(
                  setSnackbar({
                    children: res.message,
                    severity: "success",
                  })
                );
              } catch (error) {
                dispatch(
                  setSnackbar({
                    children: error,
                    severity: "error",
                  })
                );
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
