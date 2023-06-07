import "react-datasheet-grid/dist/style.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BaseCalculateSheet from "../components/calculateSheet/BaseCalculateSheet";
import BanksCalculateSheets from "../components/calculateSheet/BanksCalculateSheets";
import TotalCalculateSheets from "../components/calculateSheet/TotalCalculateSheets";
import PageConnectionWait from "../components/UI/PageConnectionWait";
import { useGetParametersQuery } from "../redux/apis/parameterApi";
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

function sumByList(attrList, dataList) {
  let totalList = attrList.map((item) => {
    return { value: item.value, total: 0 };
  });

  dataList.map((item) => {
    for (let keyItem in item) {
      totalList.forEach((element, index) => {
        if (element.value === keyItem) {
          totalList[index].total += item[keyItem];
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
  const {
    data: parameterData,
    isLoading,
    isFetching,
  } = useGetParametersQuery();
  const dispatch = useDispatch();
  const { selectedBank, data, bankData, totalData } = useSelector(
    (state) => state.calculate
  );

  useEffect(() => {
    setData([{}, {}, {}, {}, {}, {}, {}, {}]);
  }, [selectedBank]);

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameterData)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const expenseList = parameterData.filter(
    (item) => item.variant === "Gider Türleri"
  )[0];

  console.log(expenseList);
  const banksList = parameterData.filter((item) => item.variant === "Banka")[0];

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
                defaultValue="VB"
                value={selectedBank}
                label="Banka"
                size="small"
                variant="standard"
                onChange={(e) => {
                  dispatch(setSelectedBank(e.target.value));
                }}
                sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
              >
                {banksList.content.map((item) => (
                  <MenuItem key={item._id} value={item.value}>
                    {item.title}
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
              <BaseCalculateSheet expenseList={expenseList} />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: 1 }}>
              <BanksCalculateSheets expenseList={expenseList} />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Typography>Toplam</Typography>
            <Box sx={{ p: 1 }}>
              <TotalCalculateSheets expenseList={expenseList}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalculateSheet;
