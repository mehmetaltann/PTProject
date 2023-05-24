import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InfoWindows from "../components/homepage/infoCards/InfoWindows";
import ButceWindow from "../components/homepage/butce/ButceWindow";
import YatirimWindow from "../components/homepage/yatirim/YatirimWindow";
import { Box, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container sx={{ mt: 2 }}  maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={9}>
            <YatirimWindow />
          </Grid>
          <Grid xs={12} md={3}>
            <ButceWindow />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
