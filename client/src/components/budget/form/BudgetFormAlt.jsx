import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageConnectionWait from "../../UI/PageConnectionWait";
import SelectComponent from "./SelectComponent";
import { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../../../redux/apis/categoryApi";
import { uniqListFunc } from "../../../utils/help-functions";
import { materialDateInput } from "../../../utils/help-functions";
import { useAddBudgetItemMutation } from "../../../redux/apis/budgetApi";
import { useDispatch, useSelector } from "react-redux";
import { setBudgetData } from "../../../redux/slices/calculateSlice";
import {
  setSnackbar,
  pickCategoryA,
  pickCategoryB,
} from "../../../redux/slices/generalSlice";
import {
  Typography,
  TextField,
  Modal,
  Button,
  Box,
  Stack,
  MenuItem,
} from "@mui/material";
import {
  DataSheetGrid,
  floatColumn,
  textColumn,
  dateColumn,
  keyColumn,
  createAddRowsComponent,
} from "react-datasheet-grid";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "70%",
  width: { xs: "90%", lg: "70%" },
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

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

const BudgetFormAlt = () => {
  const [open, setOpen] = useState({ state: false, type: "Gelir" });
  const [openTable, setOpenTable] = useState({
    tableState: false,
    tableColumn: [],
  });
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();
  const { budgetData } = useSelector((state) => state.calculate);
  const { selectedCategoryA, selectedCategoryB } = useSelector(
    (state) => state.general
  );
  const dispatch = useDispatch();

  const handleGelirOpen = () => setOpen({ state: true, type: "Gelir" });
  const handleGiderOpen = () => setOpen({ state: true, type: "Gider" });
  const handleClose = () => setOpen({ state: false, type: "Gelir" });

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setOpenTable({
        tableState: false,
        tableColumn: [],
      });
      tableHandler(selectedCategoryA);
    }
  }, [selectedCategoryA]);

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!categories)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  function submitHandler() {
    console.log(budgetData);
  }

  function tableHandler(selectedCatA) {
    let catBList = categories
      .filter((cat) => cat.type === open.type)
      .filter((cat) => cat.categoryA === selectedCatA)
      .map((catA, index) => ({ value: catA.categoryB, label: catA.categoryB }));

    const columns = [
      { ...keyColumn("date", dateColumn), title: "Tarih" },
      { ...keyColumn("title", textColumn), title: "Konu" },
      { ...keyColumn("categoryB", textColumn), title: "Kategori B" },
      {
        ...keyColumn(
          "CategoryB",
          selectColumn({
            choices: catBList,
          })
        ),
        title: "CategoryB",
      },
      { ...keyColumn("amount", floatColumn), title: "Tutar" },
      { ...keyColumn("description", textColumn), title: "Açıklama" },
    ];

    setOpenTable({ tableState: true, tableColumn: columns });
  }

  const AddRows = createAddRowsComponent({
    button: "Ekle", // Add
    unit: "satır", // rows
  });

  return (
    <Stack direction="row" justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
      <Button
        type="button"
        onClick={handleGelirOpen}
        variant="outlined"
        color="success"
        size="large"
        startIcon={<AddCircleIcon />}
      >
        Gelir Ekle
      </Button>
      <Button
        startIcon={<AddCircleIcon />}
        type="button"
        onClick={handleGiderOpen}
        variant="outlined"
        color="error"
        size="large"
      >
        Gider Ekle
      </Button>
      <Modal
        open={open.state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                borderBottom: 1,
                borderColor: "grey.500",
              }}
            >
              Yeni {open.type}
            </Typography>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <TextField
                select
                id="categoryA"
                label="KategoryA"
                size="small"
                defaultValue={
                  open.type === "Gelir" ? "Aylık Gelirler" : "Fatura"
                }
                variant="standard"
                sx={{ minWidth: "20ch", p: 1, borderColor: "primary.main" }}
                value={selectedCategoryA}
                onChange={(e) => {
                  dispatch(pickCategoryA(e.target.value));
                }}
              >
                {uniqListFunc(
                  categories.filter((cat) => cat.type === open.type),
                  "categoryA"
                ).map((catA, index) => (
                  <MenuItem value={catA.categoryA} key={index}>
                    {catA.categoryA}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={() => tableHandler(selectedCategoryA)}
                sx={{ minWidth: "15ch" }}
              >
                Getir
              </Button>
              <Button
                variant="contained"
                onClick={submitHandler}
                sx={{ minWidth: "15ch" }}
              >
                Ekle
              </Button>
            </Stack>
            {openTable.tableState && (
              <Box sx={{ p: 2 }}>
                <DataSheetGrid
                  value={budgetData}
                  onChange={(e) => dispatch(setBudgetData(e))}
                  columns={openTable.tableColumn}
                  addRowsComponent={AddRows}
                  height={700}
                  rowHeight={35}
                  headerRowHeight={50}
                  autoAddRow
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default BudgetFormAlt;
