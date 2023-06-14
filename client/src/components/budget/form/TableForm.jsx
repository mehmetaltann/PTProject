import SelectComponent from "./UI/SelectComponent";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useMemo, Fragment } from "react";
import { uniqListFunc } from "../../../utils/help-functions";
import { dateFormatNormal } from "../../../utils/help-functions";
import { useDispatch, useSelector } from "react-redux";
import { setBudgetData } from "../../../redux/slices/calculateSlice";
import { useAddBudgetItemMutation } from "../../../redux/apis/budgetApi";
import { setSnackbar, pickCategoryA } from "../../../redux/slices/generalSlice";
import { TextField, Button, Box, Stack, MenuItem } from "@mui/material";
import {
  floatColumn,
  textColumn,
  dateColumn,
  keyColumn,
  createAddRowsComponent,
  DynamicDataSheetGrid,
} from "react-datasheet-grid";

const selectColumn = (options) => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
});

const TableForm = ({ openType, categories, closeModel }) => {
  const [catBList, setCatBList] = useState([]);
  const { budgetData } = useSelector((state) => state.calculate);
  const { selectedCategoryA } = useSelector((state) => state.general);
  const [addBudgetItem] = useAddBudgetItemMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openType === "Gider") {
      dispatch(pickCategoryA("Fatura"));
    } else {
      dispatch(pickCategoryA("Aylık Gelirler"));
    }
  }, [openType, dispatch]);

  useEffect(() => {
    setCatBList(
      categories
        .filter((cat) => cat.type === openType)
        .filter((cat) => cat.categoryA === selectedCategoryA)
        .map((catA, index) => ({
          value: catA.categoryB,
          label: catA.categoryB,
        }))
    );
  }, [selectedCategoryA, categories, openType]);

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
      } else if (!item.categoryB) {
        dispatch(
          setSnackbar({
            children: "Kategori Girilmemiş veya Hatalı girilmiş kayıt var",
            severity: "error",
          })
        );
        return false;
      } else if (!item.title || item.title.length < 2) {
        dispatch(
          setSnackbar({
            children: "İşlem Konusu Girilmemiş veya Hatalı girilmiş kayıt var",
            severity: "error",
          })
        );
        return false;
      } else if (!item.amount || item.price === 0) {
        dispatch(
          setSnackbar({
            children: "Tutar girilmemiş veya Eksik girilmiş kayıt var",
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

  async function submitHandler() {
    if (dataValidation(budgetData)) {
      const newRecords = budgetData.map((v) => ({
        ...v,
        categoryA: selectedCategoryA,
        type: openType,
        date: dateFormatNormal(v.date),
      }));
      try {
        const res = await addBudgetItem(newRecords).unwrap();
        closeModel();
        dispatch(
          setSnackbar({
            children: res.message,
            severity: "success",
          })
        );
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

  const columns = useMemo(
    () => [
      { ...keyColumn("date", dateColumn), title: "Tarih" },
      {
        ...keyColumn(
          "categoryB",
          selectColumn({
            choices: catBList,
          })
        ),
        title: "Kategori B",
      },
      { ...keyColumn("title", textColumn), title: "Konu" },
      { ...keyColumn("amount", floatColumn), title: "Tutar" },
      { ...keyColumn("description", textColumn), title: "Açıklama" },
    ],
    [catBList]
  );

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });
  return (
    <Fragment>
      <Stack direction="row" alignItems={"center"}>
        <TextField
          select
          id="categoryA"
          label="Kategori A"
          size="small"
          variant="outlined"
          sx={{ minWidth: "25ch", p: 1, borderColor: "primary.main" }}
          value={selectedCategoryA}
          onChange={(e) => {
            dispatch(pickCategoryA(e.target.value));
          }}
        >
          {uniqListFunc(
            categories.filter((cat) => cat.type === openType),
            "categoryA"
          ).map((catA, index) => (
            <MenuItem value={catA.categoryA} key={index}>
              {catA.categoryA}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={submitHandler}
          sx={{ borderRadius: "5%", minWidth: 150 }}
          variant="contained"
          size="large"
          color={openType === "Gelir" ? "success" : "error"}
          endIcon={<SendIcon />}
        >
          Ekle
        </Button>
      </Stack>
      <Box sx={{ p: 1 }}>
        <DynamicDataSheetGrid
          value={budgetData}
          onChange={(e) => dispatch(setBudgetData(e))}
          columns={columns}
          addRowsComponent={AddRows}
          height={700}
          rowHeight={35}
          headerRowHeight={50}
        />
      </Box>
    </Fragment>
  );
};

export default TableForm;
