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
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      width: 60,
      cellClassName: "boldandcolorcell",
    },
    {
      field: "date",
      type: "date",
      headerName: "Tarih",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      width: 100,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "number",
      headerName: "Adet",
      headerClassName: "header",
      type: "number",
      filterable: false,
      headerAlign: "left",
      align: "left",
      width: 75,
    },
    {
      field: "price",
      headerName: "Br. Fiyat",
      headerClassName: "header",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 105,
    },
    {
      field: "commission",
      type: "number",
      headerName: "Komisyon",
      headerClassName: "header",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 85,
    },
    {
      field: "cost",
      type: "number",
      headerName: "Maliyet",
      headerClassName: "header",
      valueGetter: (params) => params.row.cost + params.row.commission,
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 105,
      cellClassName: "boldandcolorcell",
    },
    {
      field: "presentPrice",
      headerName: "Gün. Fiyat",
      headerClassName: "header",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 105,
    },
    {
      field: "presentvalue",
      headerName: "Gün. Değer",
      headerClassName: "header",
      type: "number",
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
      width: 105,
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
      headerAlign: "left",
      align: "left",
    },
    {
      field: "dayDiff",
      headerName: "Gün",
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

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
    />
  );
};

export default DataTable;
