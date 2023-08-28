import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import PageConnectionWait from "../UI/PageConnectionWait";
import { setSnackbar } from "../../redux/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  useGetRecordsQuery,
  useDeleteRecordMutation,
} from "../../redux/apis/investmentRecordApi";
import {
  stringColumn,
  dateColumn,
  priceColumn,
  numberColumn,
  actionColumn,
} from "../../components/UI/table/columns";

const DataTable = () => {
  const [deleteRecord] = useDeleteRecordMutation();
  const { selectedDate } = useSelector((state) => state.general);
  const {
    data: recordsraw,
    isLoading,
    isFetching,
  } = useGetRecordsQuery(selectedDate);

  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!recordsraw)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const records = recordsraw.slice().sort((a, b) => a.dateDiff - b.dateDiff);

  const columns = [
    stringColumn("portfolio", "Portföy", 215),
    stringColumn("code", "Kod", 50, { cellClassName: "boldandcolorcell" }),
    numberColumn("number", "Adet", 70),
    dateColumn("purchaseDate", "Alış Tarihi"),
    priceColumn("purchasePrice", "Alış Fiyatı", 110, {
      cellClassName: "boldandcolorcell",
    }),
    dateColumn("saleDate", "Satış Tarihi"),
    priceColumn("salePrice", "Satış Fiyatı", 110, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("plStatus", "Kar/Zarar", 110, {
      renderCell: (params) =>
        params.row.plStatus <= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main", fontWeight: 500 }}
            >{`${(params.row.plStatus * -1).toFixed(2)} TL`}</Typography>
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
            >{`${(params.row.plStatus * -1).toFixed(2)} TL`}</Typography>
          </Stack>
        ),
    }),
    stringColumn("plPercentage", "Yüzde", 110, {
      renderCell: (params) =>
        params.row.plPercentage <= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main", fontWeight: 500 }}
            >{`% ${(params.row.plPercentage * -1).toFixed(2)}`}</Typography>
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
            >{`% ${(params.row.plPercentage * -1).toFixed(2)}`}</Typography>
          </Stack>
        ),
    }),
    numberColumn("dateDiff", "Gün", 60),
    actionColumn({
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
    }),
  ];

  return <DataTableFrame columns={columns} rows={records} />;
};

export default DataTable;
