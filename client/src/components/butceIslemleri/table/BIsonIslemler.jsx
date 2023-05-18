import BIdataTable from "./BIdataTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FilterTableSelect from "../../UI/table/FilterTableSelect";
import { MenuItem, Typography, TextField, Paper, Box } from "@mui/material";
import { tarihSecim } from "../../../utils/localData";
import { useSelector } from "react-redux";
import { tarihAraligiSec } from "../../../redux/butcesSlice";

const BIsonIslemler = () => {
  const { tarihAraligi } = useSelector((state) => state.butce);

  return (
    <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
        <Grid container xs={12} justifyContent={"space-between"} spacing={1}>
          <Grid xs={12} sm={3}>
            <Typography variant="h5">İşlemler</Typography>
          </Grid>
          <FilterTableSelect
            val={tarihAraligi}
            Icon={CalendarMonthIcon}
            setSelect={tarihAraligiSec}
            defaultvalue={2}
            minWidth={200}
            title="Dönem :"
          >
            {tarihSecim.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FilterTableSelect>
        </Grid>
        <Grid container xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "auto" }}>
            <BIdataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BIsonIslemler;
