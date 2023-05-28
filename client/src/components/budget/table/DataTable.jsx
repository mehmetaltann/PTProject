import BudgetDataTableFooter from "./DataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import { useState } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { Badge, IconButton, CircularProgress, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../../redux/slices/generalSlice";
import {
  useGetBudgetItemsQuery,
  useDeleteBudgetItemMutation,
} from "../../../redux/api/budgetApi";

const DataTable = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [deleteBudgetItem] = useDeleteBudgetItemMutation();
  const { selectedDate, selectedBudgetType } = useSelector(
    (state) => state.general
  );
  const {
    data: budgetItems,
    isLoading,
    isFetching,
  } = useGetBudgetItemsQuery(selectedDate);
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const filteredData =
    selectedBudgetType !== "Tümü"
      ? budgetItems.filter((item) => item.type === selectedBudgetType)
      : budgetItems;

  const columns = [
    {
      field: ".",
      headerAlign: "center",
      align: "left",
      filterable: false,
      width: 10,
      renderCell: (params) =>
        params.row.type === "Gelir" ? (
          <Badge color="success" overlap="circular" badgeContent=" " />
        ) : (
          <Badge color="error" overlap="circular" badgeContent=" " />
        ),
    },
    {
      field: "title",
      headerAlign: "left",
      width: 150,
      align: "left",
      headerName: "İslem",
    },
    {
      field: "categoryA",
      headerName: "Kategori A",
      headerAlign: "left",
      width: 150,
      align: "left",
    },
    {
      field: "categoryB",
      headerName: "Kategori B",
      headerAlign: "left",
      width: 150,
      align: "left",
    },
    {
      field: "date",
      headerName: "Tarih",
      type: "date",
      headerAlign: "left",
      width: 100,
      align: "left",
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "amount",
      headerName: "Tutar",
      type: "number",
      valueFormatter: (params) => `${params.value.toFixed(2)} TL`,
      headerAlign: "left",
      width: 150,
      align: "left",
    },
    {
      field: "description",
      headerName: "Açıklama",
      headerAlign: "left",
      width: 200,
      align: "left",
    },
    {
      field: "actions",
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteBudgetItem(params.row.id).unwrap();
                dispatch(setMessage(res));
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      headerAlign: "right",
      width: 40,
      align: "right",
      filterable: false,
      sortable: false,
    },
  ];

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      slotsProps={{
        footer: BudgetDataTableFooter,
      }}
      slotSPropProps={{
        footer: { filteredData, rowSelectionModel },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      checkboxSelection
    />
  );
};

export default DataTable;
