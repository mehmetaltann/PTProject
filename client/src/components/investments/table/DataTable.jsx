import DeleteIcon from "@mui/icons-material/Delete";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import DataTableFrame from "../../UI/table/DataTableFrame";
import { dateFormat } from "../../../utils/help-functions";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../../redux/generalSlice";
import {
  useGetInvestmentsQuery,
  useDeleteInvestmentMutation,
} from "../../../redux/apis/investmentApi";
import {
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

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
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const filteredData =
    selectedPortfolio !== "Tümü"
      ? investments?.filter((item) => item.portfolio === selectedPortfolio)
      : investments;

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
        params.row.number * params.row.cost + params.row.commission,
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
        params.row.plStatus >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
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
              sx={{ color: "error.main" }}
            >{`${params.row.plStatus} TL`}</Typography>
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
        params.row.plPercentage >= 0 ? (
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <NorthIcon sx={{ color: "success.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "success.main" }}
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
              sx={{ color: "error.main" }}
            >{`% ${params.row.plPercentage}`}</Typography>
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
            onClick={async () => {
              try {
                const res = await deleteInvestment(params.row.id).unwrap();
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
      width: 40,
      filterable: false,
      sortable: false,
      headerAlign: "right",
      align: "right",
    },
  ];

  return <DataTableFrame columns={columns} rows={filteredData} />;
};

export default DataTable;
