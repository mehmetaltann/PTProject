import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BaseCalculateSheet from "../components/calculateSheet/BaseCalculateSheet";
import BanksCalculateSheets from "../components/calculateSheet/BanksCalculateSheets";
import { useState } from "react";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  createAddRowsComponent,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/style.css";

import { Box, Container, Paper } from "@mui/material";

const CalculateSheet = () => {
  const [data, setData] = useState([{ market: 255, car: 135 }]);

  const columns = [
    { ...keyColumn("market", floatColumn), title: "Market" },
    { ...keyColumn("car", floatColumn), title: "Araba" },
    { ...keyColumn("clothes", floatColumn), title: "Giyim" },
    { ...keyColumn("healty", floatColumn), title: "Sağlık" },
    { ...keyColumn("meal", floatColumn), title: "Hazır Yemek" },
    { ...keyColumn("home", floatColumn), title: "Ev Eşyası" },
    { ...keyColumn("fun", floatColumn), title: "Eğlence - Oyun" },
    { ...keyColumn("edu", floatColumn), title: "Eğitim - Kitap" },
    { ...keyColumn("subs", floatColumn), title: "Abonelikler" },
    { ...keyColumn("cake", floatColumn), title: "Pastacılık" },
    { ...keyColumn("other", floatColumn), title: "Diğer" },
  ];

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  console.log(data);
  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container sx={{ mt: 2 }} maxWidth="xl">
        <Grid container>
          <Grid xs={12}>
            <Box sx={{ p: 2, mt: 2 }}>
              <BaseCalculateSheet />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: 2, mt: 2 }}>
              <BanksCalculateSheets />
            </Box>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalculateSheet;
