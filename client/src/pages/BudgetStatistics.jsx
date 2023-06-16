import BudgetStatisticsMain from "../components/budgetStatistics/BudgetStatisticsMain";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack, Typography } from "@mui/material";

const BudgetStatistics = () => {
  return (
    <PageWrapper>
      <Stack spacing={2}>
        <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
          <Typography variant="h6">Bütçe İstatistikleri</Typography>
        </Stack>
        <BudgetStatisticsMain />
      </Stack>
    </PageWrapper>
  );
};

export default BudgetStatistics;
