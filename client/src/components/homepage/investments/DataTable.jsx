import DataTableFrame from "../../UI/table/DataTableFrame";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import PageConnectionWait from "../../UI/PageConnectionWait";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { Stack, Typography } from "@mui/material";
import { useGetSummaryQuery } from "../../../redux/apis/summaryApi";
import {
  stringColumn,
  priceColumn,
  numberColumn,
} from "../../UI/table/columns";

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
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!summaryData)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData =
    selectedPortfolio !== "Tümü"
      ? summaryData.filter((item) => item.portfolio === selectedPortfolio)
      : summaryData;

  const columns = [
    stringColumn("code", "Kod", 55, {
      sortable: false,
      filterable: false,
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("title", "Fon Adı", 300, {
      sortable: false,
      filterable: false,
    }),
    numberColumn("totalNumber", "number", 80),
    priceColumn("averagePrice", "Ort. Fiyat", 85),
    priceColumn("presentPrice", "Güncel Fiyat", 85),
    priceColumn("totalCost", "Maliyet", 105, {
      cellClassName: "boldandcolorcell",
    }),
    priceColumn("presentValue", "Değer", 105, {
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
            <SouthIcon sx={{ color: "error.main" }} fontSize="small" />
            <Typography
              variant="body2"
              sx={{ color: "error.main", fontWeight: 500 }}
            >{`% ${params.row.plPercentage.toFixed(2)}`}</Typography>
          </Stack>
        ),
    }),
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
