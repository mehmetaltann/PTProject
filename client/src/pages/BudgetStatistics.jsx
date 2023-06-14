import PageTitle from "../components/UI/PageTitle";
import BudgetStatisticsMain from "../components/budgetStatistics/BudgetStatisticsMain";
import { Stack, Box, Container } from "@mui/material";

const BudgetStatistics = () => {
  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Bütçe İstatistikleri" />
          </Stack>
          <BudgetStatisticsMain />
        </Stack>
      </Container>
    </Box>
  );
};

export default BudgetStatistics;
