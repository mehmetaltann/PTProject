import Grid from "@mui/material/Unstable_Grid2";
import { aylar } from "../../../utils/localData";
import { useDispatch, useSelector } from "react-redux";
import { setSecilenYil, setSecilenAy } from "../../../redux/butceOzetSlice";
import {
  thisMonth,
  thisYear,
  generateArrayOfYears,
} from "../../../utils/help-functions";
import {
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";

const DatePick = () => {
  const dispatch = useDispatch();
  const { secilenAy, secilenYil } = useSelector((state) => state.butceOzet);

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={{ xs: 2, md: 0 }} justifyContent="center">
        <Grid sx={{ mr: 2 }}>
          <TextField
            select
            id="yil"
            value={secilenYil}
            label="Yıl"
            onChange={(e) => {
              dispatch(setSecilenYil(e.target.value));
            }}
            sx={{ minWidth: 100 }}
          >
            {generateArrayOfYears().map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid>
          <ToggleButtonGroup
            color="primary"
            value={secilenAy}
            exclusive
            onChange={(e) => {
              dispatch(setSecilenAy(e.target.value));
            }}
            aria-label="Platform"
            size="small"
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {aylar.map((item) => (
              <ToggleButton
                sx={{ p: 2 }}
                value={item.value}
                key={item.value}
                disabled={item.value > thisMonth && secilenYil === thisYear}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DatePick;
