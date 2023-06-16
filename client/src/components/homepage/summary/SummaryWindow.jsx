import SummaryItem from "./SummaryItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import BarChartIcon from "@mui/icons-material/BarChart";
import { thisMonth, thisYear, thisDay } from "../../../utils/help-functions";
import { Fragment } from "react";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetSummaryQuery,
  useUpdateSummaryMutation,
} from "../../../redux/apis/summaryApi";
import {
  Paper,
  Divider,
  CircularProgress,
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";

export const monthsTranslate = [
  { value: 1, label: "Ocak" },
  { value: 2, label: "Şubat" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Nisan" },
  { value: 5, label: "Mayıs" },
  { value: 6, label: "Haziran" },
  { value: 7, label: "Temmuz" },
  { value: 8, label: "Ağustos" },
  { value: 9, label: "Eylül" },
  { value: 10, label: "Ekim" },
  { value: 11, label: "Kasım" },
  { value: 12, label: "Aralık" },
];

const SummaryWindow = () => {
  const thisAyYil = `${thisDay} ${
    monthsTranslate.find((item) => item.value === thisMonth).label
  } ${thisYear}`;
  const { data: summaryData, isLoading, isFetching } = useGetSummaryQuery();
  const [updateSummary, { isLoading: updateLoad }] = useUpdateSummaryMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const portfolioValues = Object.values(
    summaryData.reduce((hash, item) => {
      if (!hash[item.portfolio]) {
        hash[item.portfolio] = {
          name: item.portfolio,
          presentValue: 0,
          totalCost: 0,
          plStatus: 0,
        };
      }
      hash[item.portfolio].presentValue += item.presentValue;
      hash[item.portfolio].totalCost += item.totalCost;
      hash[item.portfolio].plStatus += item.plStatus;
      return hash;
    }, {})
  );

  async function handleUpdate() {
    try {
      const res = await updateSummary().unwrap();
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
  }

  return (
    <Stack spacing={2}>
      <Paper>
        {updateLoad && (
          <Stack spacing={2} direction="row" sx={{ p: 2, mt: 3 }}>
            <Typography>Güncelleniyor</Typography>
            <CircularProgress />
          </Stack>
        )}
        <Stack
          sx={[{ p: 1.5, color: "info.main" }]}
          spacing={2}
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="body1" fontWeight={700}>
              Yatırım Özet
            </Typography>
            <IconButton aria-label="update" onClick={handleUpdate}>
              <RefreshIcon fontSize="inherit" color="primary.main" />
            </IconButton>
          </Stack>
          <Typography variant="body1" fontWeight={700}>
            {thisAyYil}
          </Typography>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ pt: 1 }}>
          {portfolioValues.map(
            ({ name, presentValue, totalCost, plStatus }, index) => {
              const plPercentage = (plStatus / totalCost) * 100;
              const color = plStatus >= 0 ? "success.main" : "error.main";
              return (
                <Fragment key={index}>
                  <SummaryItem
                    title={name}
                    presentValue={`${presentValue.toFixed(2)} TL`}
                    totalCost={`${totalCost.toFixed(2)} TL`}
                    plStatus={`${plStatus.toFixed(2)} TL`}
                    plPercentage={`% ${plPercentage.toFixed(2)}`}
                    sx={{
                      color: "primary.main",
                    }}
                    plColor={color}
                  />
                  <Divider />
                </Fragment>
              );
            }
          )}
        </Stack>
        <Divider />
        <Stack
          sx={[{ p: 2, fontWeight: 500, color: "info.main" }]}
          spacing={2}
          direction="row"
          justifyContent={"space-between"}
        >
          <Typography variant="body1" fontWeight={700}>
            Toplam Yatırım Değeri
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {`${summaryData
              .reduce((n, { presentValue }) => n + Number(presentValue), 0)
              .toFixed(2)} TL`}
          </Typography>
        </Stack>
      </Paper>
      <Paper>
        <Button
          sx={{ p: 2 }}
          startIcon={<BarChartIcon />}
          type="button"
          onClick={() => {
            navigate("/butce-istatistik");
          }}
          color="info"
          size="small"
        >
          <Typography variant="body1" fontWeight={700}>
            Bütçe İstatistikleri
          </Typography>
        </Button>
      </Paper>
    </Stack>
  );
};

export default SummaryWindow;
