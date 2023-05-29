import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import { useGetSummaryQuery } from "../../../redux/apis/summaryApi";

const DataTable = () => {
  const { selectedPortfolio } = useSelector((state) => state.general);
  const { data: summaryData, isLoading, isFetching } = useGetSummaryQuery();

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 2,
      bottom: params.isLastVisible ? 0 : 4,
    };
  }, []);

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const filteredData =
    selectedPortfolio !== "Tümü"
      ? summaryData.filter((item) => item.portfolio === selectedPortfolio)
      : summaryData 

  const columns = [
    {
      field: "code",
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
      width: 300,
      sortable: false,
      filterable: false,
      cellClassName: "fon_adi",
    },
    {
      field: "totalNumber",
      type: "number",
      width: 60,
      headerName: "Adet",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "averagePrice",
      headerName: "Ort. Fiyat",
      type: "number",
      width: 95,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "presentPrice",
      headerName: "Güncel Fiyat",
      type: "number",
      width: 95,
      valueFormatter: ({ value }) => `${value.toFixed(3)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalCost",
      headerName: "Maliyet",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) =>
        `${value
          .toFixed(2)
          .toLocaleString("en-US", { maximumFractionDigits: 2 })} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "presentvalue",
      headerName: "Değer",
      type: "number",
      width: 110,
      valueFormatter: ({ value }) => `${value.toFixed(2)} TL`,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "plStatus",
      headerName: "Kar/Zarar",
      type: "number",
      width: 125,
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
            >{`${params.row.plStatus.toFixed(2)} TL`}</Typography>
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
            >{`% ${params.row.plPercentage.toFixed(2)}`}</Typography>
          </Stack>
        ),
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      getRowHeight={() => "auto"}
      getEstimatedRowHeight={() => 200}
      getRowSpacing={getRowSpacing}
    />
  );
};

export default DataTable;
