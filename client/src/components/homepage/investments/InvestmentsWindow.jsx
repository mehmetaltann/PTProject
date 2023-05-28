import TableContainer from "./TableContainer";
import DataTable from "./DataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, Divider, Box } from "@mui/material";

const InvestmentsWindow = () => {
  return (
    <Paper>
      <TableContainer />
      <Divider />
      <Grid container xs={12} sx={{ height: "60vh", mt: 1, p: 1 }}>
        <Box sx={{ height: "100%", width: "100%", p: 2 }}>
          <DataTable />
        </Box>
      </Grid>
    </Paper>
  );
};

export default InvestmentsWindow;
