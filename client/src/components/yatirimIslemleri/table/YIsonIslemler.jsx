import YIdataTable from "./YIdataTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import FilterTableSelect from "../../UI/table/FilterTableSelect";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MenuItem, Typography, Paper, Box } from "@mui/material";
import { tarihSecim } from "../../../utils/localData";
import { useSelector } from "react-redux";
import { tarihAraligiSec } from "../../../redux/yatirimSlice";
import { portfoySec } from "../../../redux/portfoysSlice";

const YIsonIslemler = () => {
  const { tarihAraligi } = useSelector((state) => state.yatirim);
  const { portfoys, selectedPortfoy } = useSelector((state) => state.portfoy);

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

          <FilterTableSelect
            val={selectedPortfoy}
            Icon={FolderSpecialIcon}
            setSelect={portfoySec}
            defaultvalue=""
            minWidth={200}
            title="Portföy :"
          >
            {portfoys.map((portfoy) => (
              <MenuItem key={portfoy._id} value={portfoy.isim}>
                {portfoy.isim}
              </MenuItem>
            ))}
          </FilterTableSelect>
        </Grid>

        <Grid container xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <YIdataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YIsonIslemler;
