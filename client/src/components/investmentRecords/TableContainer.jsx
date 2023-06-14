import DataTable from "./DataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MenuItem, Typography, Paper, Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { pickDate } from "../../redux/slices/generalSlice";

export const historyPick = [
  { value: 1, label: "Son 1 Ay" },
  { value: 2, label: "Son 3 Ay" },
  { value: 3, label: "Son 6 Ay" },
  { value: 4, label: "Son 1 Yıl" },
  { value: 5, label: "Son 3 Yıl" },
  { value: 0, label: "Tümü" },
];

const TableContainer = () => {
  const { selectedDate } = useSelector((state) => state.general);
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
              value={selectedDate}
              size="small"
              onChange={(e) => {
                dispatch(pickDate(e.target.value));
              }}
              sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
            >
              {historyPick.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
