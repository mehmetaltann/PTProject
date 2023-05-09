import BIdataTable from "./BIdataTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MenuItem, Typography, TextField, Paper, Box } from "@mui/material";
import { tarihSecim } from "../../utils/localData";

const BIsonIslemler = ({ data, setSelectedDate }) => {
  return (
    <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
        <Grid container xs={12} justifyContent={"space-between"} spacing={1}>
          <Grid xs={12} sm={3}>
            <Typography variant="h5">İşlemler</Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            xs={12}
            sm={9}
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          >
            <Grid>
              <Typography variant="h6">Dönem :</Typography>
            </Grid>

            <Grid>
              <CalendarMonthIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
            </Grid>
            <Grid>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue={2}
                sx={{ minWidth: 200 }}
                variant="standard"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {tarihSecim.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "auto" }}>
            <BIdataTable data={data} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BIsonIslemler;
