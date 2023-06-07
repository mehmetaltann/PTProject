import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SummaryWindow from "../components/homepage/summary/SummaryWindow";
import InvestmentsWindow from "../components/homepage/investments/InvestmentsWindow";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container sx={{ mt: 2 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={12} md={9}>
            <InvestmentsWindow />
          </Grid>
          <Grid xs={12} md={3}>
            <SummaryWindow />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
