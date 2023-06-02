import SummaryItem from "./SummaryItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import { thisMonth, thisYear, thisDay } from "../../../utils/help-functions";
import { aylar } from "../../../utils/localData";
import { useGetSummaryQuery } from "../../../redux/apis/summaryApi";
import { Fragment } from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

const SummaryWindow = () => {
  const thisAyYil = `${thisDay} ${
    aylar.find((item) => item.value === thisMonth).label
  } ${thisYear}`;
  const { data: summaryData, isLoading, isFetching } = useGetSummaryQuery();

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

  return (
    <Paper>
      <Stack
        sx={[{ p: 2, color: "info.main" }]}
        spacing={2}
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction="row" alignItems={"center"}>
          <Typography variant="body1" fontWeight={700}>
            Özet
          </Typography>
          <IconButton aria-label="delete" sx={{ display: "none" }}>
            <RefreshIcon fontSize="inherit" color="primary.main" />
          </IconButton>
        </Stack>
        <Typography variant="body1" fontWeight={700}>
          {thisAyYil}
        </Typography>
      </Stack>
      <Divider />

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
  );
};

export default SummaryWindow;
