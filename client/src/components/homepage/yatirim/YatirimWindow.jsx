import HomeDataTableHead from "./HomeDataTableHead";
import HomeDataTable from "./HomeDataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, Divider, Box } from "@mui/material";

const YatirimWindow = () => {
  return (
    <Paper>
      <HomeDataTableHead />
      <Divider />
      <Grid container xs={12} sx={{ height: "60vh", mt: 1, p: 1 }}>
        <Box sx={{ height: "100%", width: "100%", p: 2 }}>
          <HomeDataTable />
        </Box>
      </Grid>
    </Paper>
  );
};

export default YatirimWindow;
