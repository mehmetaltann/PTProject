import PageTitle from "../components/UI/PageTitle";
import BudgetFormMain from "../components/budget/form/BudgetFormMain";
import TableContainer from "../components/budget/table/TableContainer";
import { Stack, Box, Container } from "@mui/material";

const Budget = () => {
  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Bütçe İşlemleri" />
            <BudgetFormMain />
          </Stack>
          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default Budget;
