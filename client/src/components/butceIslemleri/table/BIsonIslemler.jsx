import BIdataTable from "./BIdataTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { tarihSecim } from "../../../utils/localData";
import { useSelector, useDispatch } from "react-redux";
import { tarihAraligiSec, butceIslemTipiSec } from "../../../redux/butcesSlice";
import {
  MenuItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Box,
  Stack,
  TextField,
} from "@mui/material";

const BIsonIslemler = () => {
  const { tarihAraligi, butceIslemTipi } = useSelector((state) => state.butce);
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
                value={butceIslemTipi}
                exclusive
                onChange={(e) => dispatch(butceIslemTipiSec(e.target.value))}
                aria-label="Platform"
              >
                <ToggleButton
                  color="success"
                  value="Gelir"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Gelir
                </ToggleButton>
                <ToggleButton
                  color="error"
                  value="Gider"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Gider
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="Tümü"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Tümü
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
          <Box sx={{ height: "100%", width: "auto" }}>
            <BIdataTable />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BIsonIslemler;
