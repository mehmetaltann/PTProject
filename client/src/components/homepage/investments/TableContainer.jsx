import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography, TextField, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { pickPortfolio } from "../../../redux/portfoliosSlice";

const TableContainer = () => {
  const { portfolios, selectedPortfolio } = useSelector(
    (state) => state.portfolio
  );
  const dispatch = useDispatch();
  return (
    <Grid
      container
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid>
        <Typography
          variant="h6"
          sx={{
            color: "info.main",
            p: 1,
          }}
        >
          Yatırım Kalemleri
        </Typography>
      </Grid>
      <Grid>
        <TextField
          select
          id="portfoy"
          defaultValue="Tümü"
          value={selectedPortfolio}
          size="small"
          variant="standard"
          onChange={(e) => {
            dispatch(pickPortfolio(e.target.value));
          }}
          sx={{ minWidth: "25ch", p: 1, borderColor: "primary.main" }}
        >
          <MenuItem value="Tümü">Tümü</MenuItem>
          {portfolios.map((portfoy) => (
            <MenuItem key={portfoy._id} value={portfoy.isim}>
              {portfoy.isim}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default TableContainer;
