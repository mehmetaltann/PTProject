import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SummaryWindow from "../components/homepage/summary/SummaryWindow";
import InvestmentsWindow from "../components/homepage/investments/InvestmentsWindow";
import { PageWrapper } from "../layouts/Wrappers";

const Home = () => {
  return (
    <PageWrapper maxWidth="xl">
      <Grid container spacing={2}>
        <Grid xs={12} md={9}>
          <InvestmentsWindow />
        </Grid>
        <Grid xs={12} md={3}>
          <SummaryWindow />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
