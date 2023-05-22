import Grid from "@mui/material/Unstable_Grid2";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import { aylar } from "../../../utils/localData";
import { Paper, Typography } from "@mui/material";

const Summary = () => {
  const { secilenAy, secilenYil } = useSelector((state) => state.butceOzet);

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6" sx={{ p: 2 }}>
            {`${secilenYil} - ${
              aylar.find((item) => item.value === secilenAy).label
            } Ayı`}
          </Typography>
        </Grid>
        <Grid>
          <DataTable />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Summary;
