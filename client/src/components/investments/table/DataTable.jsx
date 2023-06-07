import DeleteIcon from "@mui/icons-material/Delete";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import DataTableFrame from "../../UI/table/DataTableFrame";
import PageConnectionWait from "../../UI/PageConnectionWait";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  useGetInvestmentsQuery,
  useDeleteInvestmentMutation,
} from "../../../redux/apis/investmentApi";
import {
  stringColumn,
  dateColumn,
  priceColumn,
  numberColumn,
  actionColumn,
} from "../../UI/table/columns";

const DataTable = () => {
  const { selectedDate, selectedPortfolio } = useSelector(
    (state) => state.general
  );
  const [deleteInvestment] = useDeleteInvestmentMutation();
  const {
    data: investments,
    isLoading,
    isFetching,
  } = useGetInvestmentsQuery(selectedDate);
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!investments)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData =
    selectedPortfolio !== "Tümü"
      ? investments?.filter((item) => item.portfolio === selectedPortfolio)
      : investments;

  const columns = [
    stringColumn("code", "Kod", 60, { cellClassName: "boldandcolorcell" }),
    dateColumn("date", "Tarih"),
    numberColumn("number", "Adet", 80),
    priceColumn("price", "Br. Fiyat", 90),
    priceColumn("commission", "Komisyon", 85),
    priceColumn("cost", "Maliyet", 105, {
      valueGetter: (params) => params.row.cost + params.row.commission,
      cellClassName: "boldandcolorcell",
    }),
    priceColumn("presentPrice", "Gün. Fiyat", 90),
    priceColumn("presentvalue", "Gün. Değer", 105, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("plStatus", "Kar/Zarar", 110, {
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
    }),
    stringColumn("plPercentage", "Yüzde", 110, {
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
            <SouthIcon
              sx={{ color: "error.main", fontWeight: 500 }}
              fontSize="small"
            />
            <Typography
              variant="body2"
              sx={{ color: "error.main" }}
            >{`% ${params.row.plPercentage.toFixed(2)}`}</Typography>
          </Stack>
        ),
    }),
    numberColumn("dayDiff", "Gün", 60),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteInvestment(params.row.id).unwrap();
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

  return <DataTableFrame columns={columns} rows={filteredData} />;
};

export default DataTable;
