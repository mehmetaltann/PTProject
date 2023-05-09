import YIdataTable from "./YIdataTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MenuItem, Typography, TextField, Paper, Box } from "@mui/material";
import { tarihSecim } from "../../utils/localData";
import FilterTableSelect from "../UI/table/FilterTableSelect";

const deneme = "Bireysel Emeklilik Fonları";

const YIsonIslemler = ({
  data,
  setSelectedDate,
  selectedPortfoy,
  setSelectedPortfoy,
  portfoyler,
}) => {
  const filteredData = data.filter(
    (item) => item.portfoy_ismi === selectedPortfoy
  );

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
            Icon={CalendarMonthIcon}
            setSelect={setSelectedDate}
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
            Icon={FolderSpecialIcon}
            setSelect={setSelectedPortfoy}
            defaultvalue=""
            minWidth={200}
            title="Portföy :"
          >
            {portfoyler.map((portfoy) => (
              <MenuItem key={portfoy._id} value={portfoy.isim}>
                {portfoy.isim}
              </MenuItem>
            ))}
          </FilterTableSelect>
        </Grid>

        <Grid container xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <YIdataTable data={filteredData} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YIsonIslemler;
