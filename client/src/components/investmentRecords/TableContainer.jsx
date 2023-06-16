import DataTable from "./DataTable";
import AltanSelect from "../UI/AltanSelect";
import { Typography, Paper, Stack } from "@mui/material";
import { DataTableWrapper } from "../../layouts/Wrappers";
import { useSelector } from "react-redux";
import { pickDate } from "../../redux/slices/generalSlice";

export const historyPick = [
  { value: 1, label: "Son 1 Ay" },
  { value: 2, label: "Son 3 Ay" },
  { value: 3, label: "Son 6 Ay" },
  { value: 4, label: "Son 1 Yıl" },
  { value: 5, label: "Son 3 Yıl" },
  { value: 0, label: "Tümü" },
];

const TableContainer = () => {
  const { selectedDate } = useSelector((state) => state.general);

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 1, ml: 2, mr: 2 }}
      >
        <Typography variant="h6" color="info.main">
          Geçmiş İşlemler
        </Typography>
        <AltanSelect
          id="tarih"
          defaultValue={2}
          value={selectedDate}
          minWidth="20ch"
          onChange={pickDate}
          data={historyPick}
          dataTextAttr="label"
          dataValueAttr="value"
        />
      </Stack>
      <DataTableWrapper tableHeight={"78vh"} sxProps={{ p: { xs: 1, md: 2 } }}>
        <DataTable />
      </DataTableWrapper>
    </Paper>
  );
};

export default TableContainer;
