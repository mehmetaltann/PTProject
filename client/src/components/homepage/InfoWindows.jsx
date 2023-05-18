import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, Typography, Stack } from "@mui/material";

const InfoWindows = ({ title1, title2 }) => {
  return (
    <Grid>
      <Paper elevation={3} sx={{ width: 200, height: 80, borderRadius: 3 }}>
        <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
          <Typography variant="h6">{title1}</Typography>
          <Typography variant="h6">{title2}</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default InfoWindows;
