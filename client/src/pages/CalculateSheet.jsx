import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BaseCalculateSheet from "../components/calculateSheet/BaseCalculateSheet";
import BanksCalculateSheets from "../components/calculateSheet/BanksCalculateSheets";
import TotalCalculateSheets from "../components/calculateSheet/TotalCalculateSheets";
import PageConnectionWait from "../components/UI/PageConnectionWait";
import AltanSelect from "../components/UI/AltanSelect";
import { PageWrapper } from "../layouts/Wrappers";
import { useGetParametersQuery } from "../redux/apis/parameterApi";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  setBankData,
  setTotalData,
  setData,
  setSelectedBank,
} from "../redux/slices/calculateSlice";

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
  const { selectedBank, data, bankData } = useSelector(
    (state) => state.calculate
  );

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameterData)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const expenseList = parameterData.filter(
    (item) => item.variant === "Gider Türleri"
  )[0];

  const banksList = parameterData.filter((item) => item.variant === "Banka")[0];

  async function handleTotalData(bankDATAS) {
    const newTotalObject = Object.assign(
      {},
      ...(await sumByList(expenseList.content, bankDATAS))
    );
    newTotalObject["costing"] = +Object.values(newTotalObject)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    dispatch(setTotalData([newTotalObject]));
  }

  async function calculateHandle() {
    const newBankObject = Object.assign(
      {},
      ...(await sumByList(expenseList.content, data))
    );
    newBankObject["costing"] = +Object.values(newBankObject)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    const bankName = banksList.content.filter(
      (item) => item.value === selectedBank
    )[0].title;

    newBankObject["bank"] = bankName;

    const bankObject = bankData
      .filter((item) => item.bank === newBankObject.bank)
      .shift();

    if (!bankObject) {
      const newBankData = [newBankObject, ...bankData];
      dispatch(setBankData(newBankData));
      handleTotalData(newBankData);
      dispatch(setData([{}, {}, {}, {}, {}, {}, {}, {}]));
    } else {
      const mergedObject = [
        ...Object.entries(newBankObject),
        ...Object.entries(bankObject),
      ].reduce(
        (acc, [key, val]) => ({ ...acc, [key]: (acc[key] || 0) + val }),
        {}
      );
      mergedObject["bank"] = bankName;
      const newBankData = bankData.filter((item) => item.bank !== bankName);

      newBankData.push(mergedObject);
      dispatch(setBankData(newBankData));
      handleTotalData(newBankData);
      dispatch(setData([{}, {}, {}, {}, {}, {}, {}, {}]));
    }
  }

  return (
    <PageWrapper maxWidth="xl">
      <Grid container>
        <Grid xs={12}>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <AltanSelect
              id="bank"
              defaultValue="VB"
              value={selectedBank}
              minWidth="20ch"
              onChange={setSelectedBank}
              data={banksList.content}
              dataTextAttr="title"
              dataValueAttr="value"
              label="Banka"
            />
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
            <TotalCalculateSheets expenseList={expenseList} />
          </Box>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default CalculateSheet;
