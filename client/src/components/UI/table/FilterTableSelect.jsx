import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

const FilterTableSelect = ({
  children,
  Icon,
  setSelect,
  defaultvalue,
  minWidth,
  title,
  val,
  gridSM = 4,
}) => {
  const dispatch = useDispatch();

  return (
    <Grid
      container
      spacing={1}
      xs={12}
      sm={gridSM}
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
          select
          value={val}
          defaultValue={defaultvalue}
          sx={{ minWidth: minWidth }}
          variant={"standard"}
          onChange={(e) => dispatch(setSelect(e.target.value))}
        >
          {children}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default FilterTableSelect;
