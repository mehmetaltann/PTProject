import DataTable from "./DataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { tarihSecim } from "../../../utils/localData";
import { useSelector, useDispatch } from "react-redux";
import { pickDate, pickPortfolio } from "../../../redux/generalSlice";
import { MenuItem, Typography, Paper, Box, TextField } from "@mui/material";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";

const TableContainer = () => {
  const { selectedDate, selectedPortfolio } = useSelector(
    (state) => state.general
  );
  const { data: portfolios } = useGetPortfoliosQuery();
  const dispatch = useDispatch();

  return (
    <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
        <Grid
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={{ xs: 3, sm: 2, md: 1 }}
        >
          <Grid xs={12} md={4}>
            <Typography variant="h5">İşlemler</Typography>
          </Grid>
          <Grid
            container
            xs={12}
            md={8}
            spacing={{ xs: 0, md: 1 }}
            justifyContent={{ md: "flex-end", xs: "flex-start" }}
            alignItems="center"
          >
            <Grid>
              <TextField
                select
                id="tarih"
                defaultValue={2}
                value={selectedDate}
                size="small"
                variant="standard"
                onChange={(e) => {
                  dispatch(pickDate(e.target.value));
                }}
                sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
              >
                {tarihSecim.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                select
                variant="standard"
                id="portfoy"
                defaultValue="Tümü"
                value={selectedPortfolio}
                size="small"
                onChange={(e) => {
                  dispatch(pickPortfolio(e.target.value));
                }}
                sx={{ minWidth: "25ch", p: 1, borderColor: "primary.main" }}
              >
                <MenuItem value="Tümü">Tümü</MenuItem>
                {portfolios?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.title}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sx={{ height: "60vh", mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TableContainer;
