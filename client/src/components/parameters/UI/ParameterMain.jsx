import ParameterForm from "./ParameterForm";
import ParameterTable from "./ParameterTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, Typography } from "@mui/material";

const ParameterMain = ({
  title1,
  title2,
  formName,
  tableWidth,
  data,
  deleteFunction,
  addFunction,
}) => {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{ p: 1, mb: 1 }}
        >
          {title1}
        </Typography>
        <Paper>
          <ParameterForm formName={formName} addFunction={addFunction} />
        </Paper>
      </Grid>
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          {title2}
        </Typography>
        <Paper>
          <ParameterTable
            tableWidth={tableWidth}
            data={data}
            deleteFunction={deleteFunction}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ParameterMain;
