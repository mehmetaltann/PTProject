import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, TextField } from "@mui/material";

const FilterTableSelect = ({
  children,
  Icon,
  setSelect,
  defaultvalue,
  minWidth,
  title
}) => {
  return (
    <Grid
      container
      spacing={1}
      xs={12}
      sm={5}
      justifyContent={{ xs: "flex-start", sm: "flex-end" }}
    >
      <Grid>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid>
        <Icon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      </Grid>
      <Grid>
        <TextField
          id="outlined-select-currency"
          select
          defaultValue={defaultvalue}
          sx={{ minWidth: minWidth }}
          variant={"standard"}
          onChange={(e) => setSelect(e.target.value)}
        >
          {children}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default FilterTableSelect;
