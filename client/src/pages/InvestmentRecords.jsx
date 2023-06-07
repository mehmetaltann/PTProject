import PageTitle from "../components/UI/PageTitle";
import TableContainer from "../components/investmentRecords/TableContainer";
import { Stack, Box, Container } from "@mui/material";

const InvestmentRecords = () => {
  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Geçmiş Yatırım İşlemleri" />
          </Stack>
          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default InvestmentRecords;
