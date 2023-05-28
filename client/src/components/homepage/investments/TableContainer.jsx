import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector, useDispatch } from "react-redux";
import { pickPortfolio } from "../../../redux/generalSlice";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";
import {
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";

const TableContainer = () => {
  const { selectedPortfolio } = useSelector((state) => state.general);
  const { data: portfolios, isLoading, isFetching } = useGetPortfoliosQuery();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

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
          {portfolios.map((item) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default TableContainer;
