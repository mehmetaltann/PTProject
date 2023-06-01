import BudgetDataTableFooter from "./DataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import PoolIcon from "@mui/icons-material/Pool";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { useState, useCallback } from "react";
import { dateFormat, dateFormatNormal } from "../../../utils/help-functions";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/generalSlice";
import { IconButton, CircularProgress, Box } from "@mui/material";
import {
  useGetBudgetItemsQuery,
  useDeleteBudgetItemMutation,
  useUpdateBudgetItemMutation,
} from "../../../redux/apis/budgetApi";

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.title?.trim() === "") {
            reject(new Error("İşlem Konusu Boş Olamaz"));
          } else {
            resolve({ ...item, title: item.title });
          }
        }, 200);
      }),
    []
  );
};

const DataTable = () => {
  const dispatch = useDispatch();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [deleteBudgetItem] = useDeleteBudgetItemMutation();
  const [updateBudgetItem] = useUpdateBudgetItemMutation();
  const { selectedDate, selectedBudgetType } = useSelector(
    (state) => state.general
  );

  const mutateRow = useFakeMutation();

  const {
    data: budgetItems,
    isLoading,
    isFetching,
  } = useGetBudgetItemsQuery(selectedDate);

  const processRowUpdate = useCallback(
    async (newRow) => {
      newRow.date = dateFormatNormal(newRow.date);
      try {
        const res = await updateBudgetItem(newRow).unwrap();
        const response = await mutateRow(newRow);
        dispatch(
          setSnackbar({
            children: res.message,
            severity: "success",
          })
        );

        return response;
      } catch (error) {
        dispatch(
          setSnackbar({
            children: error,
            severity: "error",
          })
        );
      }
    },
    [mutateRow, dispatch]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    dispatch(setSnackbar({ children: error.message, severity: "error" }));
  }, []);

  if (isLoading && isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  const valid = budgetItems.every(item => isNaN(x))


  const filteredData =
    selectedBudgetType !== "Tümü"
      ? budgetItems.filter((item) => item.type === selectedBudgetType)
      : budgetItems;

  const columns = [
    {
      field: ":)",
      headerAlign: "center",
      headerClassName: "header",
      align: "left",
      filterable: false,
      width: 10,
      renderCell: (params) => {
        if (params.row.categoryA === "Aylık Gelirler") {
          return <PaidIcon color="success" />;
        } else if (params.row.categoryB === "Sena") {
          return <FavoriteIcon color="success" />;
        } else if (params.row.categoryA === "İlave Gelirler") {
          return <AttachMoneyIcon color="success" />;
        } else if (params.row.categoryB === "Araç") {
          return <CarRepairIcon color="error" />;
        } else if (params.row.categoryB === "Giyim") {
          return <CheckroomIcon color="error" />;
        } else if (params.row.categoryB === "Market") {
          return <ShoppingCartIcon color="error" />;
        } else if (params.row.categoryB === "Telefon") {
          return <PhoneIphoneIcon color="error" />;
        } else if (params.row.categoryA === "Birikim") {
          return <AddBusinessIcon color="error" />;
        } else if (params.row.categoryB === "Kredi") {
          return <AccountBalanceIcon color="error" />;
        } else if (params.row.categoryB === "Sağlık") {
          return <MonitorHeartIcon color="error" />;
        } else if (params.row.categoryB === "Hazır Yemek") {
          return <LocalDiningIcon color="error" />;
        } else if (params.row.categoryB === "Su") {
          return <WaterDropIcon color="error" />;
        } else if (params.row.categoryB === "Elektrik") {
          return <ElectricalServicesIcon color="error" />;
        } else if (params.row.categoryB === "Doğalgaz") {
          return <PropaneTankIcon color="error" />;
        } else if (
          params.row.categoryB === "Eğitim-Kitap" ||
          params.row.categoryB === "Okul Aidatı"
        ) {
          return <SchoolIcon color="error" />;
        } else if (params.row.categoryB === "İnternet-TV") {
          return <ConnectedTvIcon color="error" />;
        } else if (params.row.categoryB === "Tatil") {
          return <PoolIcon color="error" />;
        } else if (
          params.row.categoryB === "Ev Eşyası" ||
          params.row.categoryB === "Ev Tadilat" ||
          params.row.categoryB === "Site Yakıt" ||
          params.row.categoryB === "Site Aidat"
        ) {
          return <OtherHousesIcon color="error" />;
        } else if (
          params.row.categoryB === "Borç" ||
          params.row.categoryB === "Diğer" ||
          params.row.categoryB === "Kira"
        ) {
          return <AttachMoneyIcon color="error" />;
        } else if (params.row.categoryB === "ATM Nakit") {
          return <LocalAtmIcon color="error" />;
        } else if (params.row.categoryB === "Eğlence-Oyun") {
          return <NightlifeIcon color="error" />;
        } else {
          return <EventRepeatIcon color="error" />;
        }
      },
    },
    {
      field: "title",
      headerAlign: "left",
      headerClassName: "header",
      width: 170,
      align: "left",
      headerName: "İşlem",
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "categoryA",
      headerName: "Kategori A",
      headerClassName: "header",
      headerAlign: "left",
      width: 130,
      align: "left",
    },
    {
      field: "categoryB",
      headerName: "Kategori B",
      headerClassName: "header",
      headerAlign: "left",
      width: 130,
      align: "left",
    },
    {
      field: "date",
      headerName: "Tarih",
      headerClassName: "header",
      type: "date",
      headerAlign: "left",
      width: 100,
      align: "left",
      editable: true,
      valueFormatter: (params) => dateFormat(params.value),
    },
    {
      field: "amount",
      headerName: "Tutar",
      headerClassName: "header",
      type: "number",
      valueFormatter: (params) => `${params.value.toFixed(2)} TL`,
      headerAlign: "left",
      width: 150,
      align: "left",
      editable: true,
      cellClassName: "boldandcolorcell",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "description",
      editable: true,
      headerName: "Açıklama",
      headerClassName: "header",
      headerAlign: "left",
      width: 200,
      align: "left",
    },
    {
      field: "actions",
      headerName: "İşlem",
      headerClassName: "header",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteBudgetItem(params.row.id).unwrap();
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
                    severity: "success",
                  })
                );
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      headerAlign: "left",
      width: 70,
      align: "right",
      filterable: false,
      sortable: false,
    },
  ];

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
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
      sx={{
        "& .boldandcolorcell": {
          color: "primary.main",
          fontWeight: "600",
        },
        "& .header": {
          color: "primary.main",
          fontWeight: "600",
        },
      }}
    />
  );
};

export default DataTable;
