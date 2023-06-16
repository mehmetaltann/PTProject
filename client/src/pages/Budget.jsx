import BudgetFormMain from "../components/budget/form/BudgetFormMain";
import TableContainer from "../components/budget/table/TableContainer";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack, Typography, Paper } from "@mui/material";

const Budget = () => {
  return (
    <PageWrapper>
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Stack
            spacing={{ xs: 4, md: 4 }}
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ ml: 3, xs: { width: "100%" } }}
          >
            <Typography variant="h6" color="info.main">
              Bütçe İşlemleri
            </Typography>
            <BudgetFormMain />
          </Stack>
        </Paper>
        <TableContainer />
      </Stack>
    </PageWrapper>
  );
};

export default Budget;
