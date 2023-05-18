import Grid from "@mui/material/Unstable_Grid2/Grid2";
import YPdataTable from "./YPdataTable";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import InfoWindows from "./InfoWindows";

const YatirimPositions = () => {
  const [selectedPortfoy, setSelectedPortfoy] = useState(second);
  const { portfoys } = useSelector((state) => state.portfoy);

  return (
    <Paper variant="outlined" sx={{ mt: 2, p: 6, height: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">Yatırım Rakamları</Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          xs={12}
          sx={{ p: 1, height: "100%" }}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <InfoWindows title1="Toplam Tutar" title2={123} />
          <InfoWindows title1="Toplam Kazanç" title2={123} />
          <InfoWindows title1="Toplam Ödenen" title2={123} />
          <Grid>
            <TextField
              select
              id="combo-box-demo"
              defaultValue="Tümü"
              sx={{ width: 200 }}
              variant="standard"
              onChange={(e) => setSelectedPortfoy(e.target.value)}
            >
              <MenuItem value="Tümü">Tümü</MenuItem>
              {portfoys.map((option) => (
                <MenuItem key={option._id} value={option.isim}>
                  {option.isim}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ height: 500, mt: 1 }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <YPdataTable selectedPortfoy={selectedPortfoy} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YatirimPositions;
