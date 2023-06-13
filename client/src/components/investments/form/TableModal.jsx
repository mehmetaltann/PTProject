import { useSelector, useDispatch } from "react-redux";
import { setInvestmentData } from "../../../redux/slices/calculateSlice";
import { pickPortfolio, setSnackbar } from "../../../redux/slices/generalSlice";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";
import { dateFormatNormal } from "../../../utils/help-functions";
import { useAddPurchasesMutation } from "../../../redux/apis/investmentApi";
import {
  DataSheetGrid,
  floatColumn,
  textColumn,
  dateColumn,
  keyColumn,
  createAddRowsComponent,
} from "react-datasheet-grid";
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const TableModal = ({ setOpenAlis }) => {
  const { budgetData: data } = useSelector((state) => state.calculate);
  const { selectedPortfolio } = useSelector((state) => state.general);
  const { data: portfolios } = useGetPortfoliosQuery();
  const [addPurchases] = useAddPurchasesMutation();
  const dispatch = useDispatch();

  const columns = [
    { ...keyColumn("date", dateColumn), title: "Tarih" },
    { ...keyColumn("code", textColumn), title: "Kod" },
    { ...keyColumn("number", floatColumn), title: "Adet" },
    { ...keyColumn("price", floatColumn), title: "Fiyat" },
    { ...keyColumn("commission", floatColumn), title: "Komisyon" },
  ];

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  function dataValidation(controlData) {
    const returnList = controlData.map((item) => {
      if (!item.date) {
        dispatch(
          setSnackbar({
            children: "Tarih Girilmemiş",
            severity: "error",
          })
        );
        return false;
      } else if (!item.code || item.code.length < 3 || item.code.length > 3) {
        dispatch(
          setSnackbar({
            children: "Kod Girilmemiş veya Hatalı girilmiş kayıt var",
            severity: "error",
          })
        );
        return false;
      } else if (!item.number || item.number === 0) {
        dispatch(
          setSnackbar({
            children: "Adet Girilmemiş veya Hatalı girilmiş kayıt var",
            severity: "error",
          })
        );
        return false;
      } else if (!item.price || item.price === 0) {
        dispatch(
          setSnackbar({
            children: "Fiyat girilmemiş veya Eksik girilmiş kayıt var",
            severity: "error",
          })
        );
        return false;
      } else {
        return true;
      }
    });

    return returnList.every((item) => item === true);
  }

  async function purchaseHandle() {
    if (dataValidation(data)) {
      const newRecords = data.map((v) => ({
        ...v,
        code: v.code.toUpperCase().trim(),
        portfolio:
          selectedPortfolio === "Tümü"
            ? "Bireysel Emeklilik Fonları"
            : selectedPortfolio,
        date: dateFormatNormal(v.date),
        commission: v.commission ? v.commission : 0,
      }));
      try {
        const res = await addPurchases(newRecords).unwrap();
        setOpenAlis(false);
        dispatch(
          setSnackbar({
            children: res.message,
            severity: "success",
          })
        );
        dispatch(setInvestmentData([{}, {}]));
      } catch (error) {
        dispatch(
          setSnackbar({
            children: error,
            severity: "error",
          })
        );
      }
    }
  }

  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          borderBottom: 1,
          borderColor: "grey.500",
        }}
      >
        Yeni Alış
      </Typography>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <TextField
          select
          id="bank"
          defaultValue="Bireysel Emeklilik Fonları"
          value={
            selectedPortfolio === "Tümü"
              ? "Bireysel Emeklilik Fonları"
              : selectedPortfolio
          }
          label="Portföy"
          size="small"
          variant="standard"
          onChange={(e) => {
            dispatch(pickPortfolio(e.target.value));
          }}
          sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
        >
          {portfolios.map((item) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={purchaseHandle}
          sx={{ minWidth: "15ch" }}
        >
          Ekle
        </Button>
      </Stack>
      <Box sx={{ p: 2 }}>
        <DataSheetGrid
          value={data}
          onChange={(e) => dispatch(setInvestmentData(e))}
          columns={columns}
          addRowsComponent={AddRows}
          height={700}
          rowHeight={35}
          headerRowHeight={50}
          autoAddRow
        />
      </Box>
    </Stack>
  );
};

export default TableModal;
