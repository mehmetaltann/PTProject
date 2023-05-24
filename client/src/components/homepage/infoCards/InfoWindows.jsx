import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InfoCard from "./InfoCard";
import { Paper, Typography, Stack } from "@mui/material";

const InfoWindows = ({ title1, title2 }) => {
  return (
    <Grid container spacing={2}>
      <Grid>
        <InfoCard title="Yatırım Tutarı" price={2542.25} />
      </Grid>
      <Grid>
        <InfoCard title="Toplam Getiri" price={2542.25} />
      </Grid>
      <Grid>
        <InfoCard title="Toplam Tutar" price={2542.25} />
      </Grid>
    </Grid>
  );
};

export default InfoWindows;
