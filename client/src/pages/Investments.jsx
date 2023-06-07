import PageTitle from "../components/UI/PageTitle";
import InvestmentForm from "../components/investments/form/InvestmentForm";
import TableContainer from "../components/investments/table/TableContainer";
import { Stack, Box, Container } from "@mui/material";

const Investments = () => {
  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Yatırım İşlemleri" />
            <InvestmentForm />
          </Stack>

          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default Investments;
