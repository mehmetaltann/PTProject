import "react-datasheet-grid/dist/style.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BaseCalculateSheet from "../components/calculateSheet/BaseCalculateSheet";
import BanksCalculateSheets from "../components/calculateSheet/BanksCalculateSheets";
import TotalCalculateSheets from "../components/calculateSheet/TotalCalculateSheets";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setBankData,
  setTotalData,
  setData,
  setSelectedBank,
} from "../redux/slices/calculateSlice";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const banksList = ["Vakıfbank", "Yapı Kredi", "Finansbank"];

export const expenseList = [
  { value: "market", title: "Market" },
  { value: "car", title: "Araba" },
  { value: "clothes", title: "Giysi" },
  { value: "healty", title: "Sağlık" },
  { value: "meal", title: "Hazır Yemek" },
  { value: "home", title: "Ev Eşyası" },
  { value: "fun", title: "Eğlence - Teknoloji" },
  { value: "edu", title: "Eğitim - Kitap" },
  { value: "subs", title: "Abonelikler" },
  { value: "cake", title: "Pastacılık" },
  { value: "other", title: "Diğer" },
];

function sumByList(attrList, dataList) {
  let totalList = attrList.map((item) => {
    return { value: item.value, total: 0 };
  });

  dataList.map((item) => {
    for (var key in item) {
      totalList.forEach((element, index) => {
        if (element.value === key) {
          totalList[index].total += item[key];
        }
      });
    }
  });

  const arrangeList = totalList.map((item) => {
    let key = item.value;
    return { [key]: item.total };
  });

  return arrangeList;
}

const CalculateSheet = () => {
  const dispatch = useDispatch();
  const { selectedBank, data, bankData, totalData } = useSelector(
    (state) => state.calculate
  );

  useEffect(() => {
    setData([{}, {}, {}, {}, {}, {}, {}, {}]);
  }, [selectedBank]);

  function handleBankData() {
    const newBankObject = Object.assign({}, ...sumByList(expenseList, data));
    newBankObject["costing"] = Object.values(newBankObject).reduce(
      (a, b) => a + b,
      0
    );
    newBankObject["bank"] = selectedBank;

    const filteredBankData = bankData.filter(
      (item) => item.bank !== selectedBank
    );

    dispatch(setBankData([newBankObject, ...filteredBankData]));
  }

  function handleTotalData() {
    console.log(totalData);
    const newTotalObject = Object.assign(
      {},
      ...sumByList(expenseList, bankData)
    );
    newTotalObject["costing"] = Object.values(newTotalObject).reduce(
      (a, b) => a + b,
      0
    );
    console.log(newTotalObject);

    dispatch(setTotalData([newTotalObject]));
  }

  function calculateHandle() {
    handleBankData();
    handleTotalData();
  }

  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container sx={{ mt: 2 }} maxWidth="xl">
        <Grid container>
          <Grid xs={12}>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <TextField
                select
                id="bank"
                defaultValue="Vakıfbank"
                value={selectedBank}
                label="Banka"
                size="small"
                variant="standard"
                onChange={(e) => {
                  dispatch(setSelectedBank(e.target.value));
                }}
                sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
              >
                {banksList.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={calculateHandle}
                sx={{ minWidth: "15ch" }}
              >
                Ekle
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: 1 }}>
              <BaseCalculateSheet />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: 1 }}>
              <BanksCalculateSheets />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Typography>Toplam</Typography>
            <Box sx={{ p: 1 }}>
              <TotalCalculateSheets />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalculateSheet;
