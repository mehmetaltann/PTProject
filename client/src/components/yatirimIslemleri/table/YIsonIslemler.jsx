import YIdataTable from "./YIdataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { tarihSecim } from "../../../utils/localData";
import { useSelector, useDispatch } from "react-redux";
import { tarihAraligiSec, islemTipiSec } from "../../../redux/yatirimSlice";
import { portfoySec } from "../../../redux/portfoysSlice";
import {
  MenuItem,
  Typography,
  Paper,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  TextField,
} from "@mui/material";

const YIsonIslemler = () => {
  const { tarihAraligi, islemTipi } = useSelector((state) => state.yatirim);
  const { portfoys, selectedPortfoy } = useSelector((state) => state.portfoy);
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
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Typography variant="h5">İşlemler</Typography>
              <ToggleButtonGroup
                value={islemTipi}
                exclusive
                onChange={(e) => dispatch(islemTipiSec(e.target.value))}
                aria-label="Platform"
              >
                <ToggleButton
                  color="success"
                  value="Alış"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                >
                  Alış
                </ToggleButton>
                <ToggleButton
                  color="error"
                  value="Satış"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                >
                  Satış
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
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
                value={tarihAraligi}
                size="small"
                variant="standard"
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
            <Grid>
              <TextField
                select
                variant="standard"
                id="portfoy"
                defaultValue="Tümü"
                value={selectedPortfoy}
                size="small"
                onChange={(e) => {
                  dispatch(portfoySec(e.target.value));
                }}
                sx={{ minWidth: "25ch", p: 1, borderColor: "primary.main" }}
              >
                <MenuItem value="Tümü">Tümü</MenuItem>
                {portfoys.map((portfoy) => (
                  <MenuItem key={portfoy._id} value={portfoy.isim}>
                    {portfoy.isim}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sx={{ height: "60vh", mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <YIdataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YIsonIslemler;

/*   

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

*/
