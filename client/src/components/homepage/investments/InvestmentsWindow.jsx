import TableContainer from "./TableContainer";
import DataTable from "./DataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, Divider } from "@mui/material";
import { DataTableWrapper } from "../../../layouts/Wrappers";

const InvestmentsWindow = () => {
  return (
    <Paper>
      <TableContainer />
      <Divider />
      <Grid container xs={12}>
        <DataTableWrapper
          tableHeight={"75vh"}
          sxProps={{ p: { xs: 0, md: 2 }, mt: { xs: 1, md: 0 } }}
        >
          <DataTable />
        </DataTableWrapper>
      </Grid>
    </Paper>
  );
};

export default InvestmentsWindow;
