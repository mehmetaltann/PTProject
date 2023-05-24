import YGdataTable from "./YGdataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { tarihSecim } from "../../../utils/localData";
import { MenuItem, Typography, Paper, Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { tarihAraligiSec } from "../../../redux/historiesSlice";

const YGsonIslemler = () => {
  const { tarihAraligi } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  return (
    <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
        <Grid
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={{ xs: 2, sm: 1 }}
        >
          <Grid xs={12} sm={2}>
            <Typography variant="h5">İşlemler</Typography>
          </Grid>
          <Grid
            container
            xs={12}
            md={8}
            spacing={{ xs: 0, md: 1 }}
            justifyContent={{ md: "flex-end", xs: "flex-start" }}
          >
            <TextField
              select
              id="tarih"
              variant="standard"
              defaultValue={2}
              value={tarihAraligi}
              size="small"
              onChange={(e) => {
                dispatch(tarihAraligiSec(e.target.value));
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
        </Grid>
        <Grid container xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <YGdataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YGsonIslemler;
