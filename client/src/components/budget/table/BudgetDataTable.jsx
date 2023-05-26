import BudgetDataTableFooter from "./BudgetDataTableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../../UI/table/DataTableFrame";
import { useMemo, useState, useEffect } from "react";
import { dateFormat } from "../../../utils/help-functions";
import { Badge, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getButceIslemleri,
  deleteButceIslemi,
} from "../../../redux/butcesSlice";

const BudgetDataTable = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { butceIslemleri, tarihAraligi, degisim, butceIslemTipi } = useSelector(
    (state) => state.butce
  );

  const dispatch = useDispatch();

  const filteredData =
    butceIslemTipi !== "Tümü"
      ? butceIslemleri.filter((item) => item.type === butceIslemTipi)
      : butceIslemleri;

  useEffect(() => {
    dispatch(getButceIslemleri());
  }, [tarihAraligi, degisim, dispatch]);

  const COLUMNS = [
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
    { field: "description", headerName: "Açıklama",headerAlign: "left",
    width: 200,
    align: "left", },
    {
      field: "actions",
      headerName: "İşlem",
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={() => {
              dispatch(deleteButceIslemi(params.row.id));
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

  const columns = useMemo(() => COLUMNS, []);

  return (
    <DataTableFrame
      columns={columns}
      rows={filteredData}
      slotsProps={{
        footer: BudgetDataTableFooter,
      }}
      slotSPropProps={{
        footer: { butceIslemleri, rowSelectionModel },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={rowSelectionModel}
      checkboxSelection
    />
  );
};

export default BudgetDataTable;
