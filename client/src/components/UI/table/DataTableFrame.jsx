import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { DataGrid, GridToolbar, trTR } from "@mui/x-data-grid";

const DataTableFrame = (props) => {
  const { columns, rows, sxProps, slotsProps, slotSPropProps, ...rest } = props;

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      density="compact"
      initialState={{
        ...rows.initialState,
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        toolbar: GridToolbar,
        ...slotsProps,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
        ...slotSPropProps,
      }}
      sx={{
        boxShadow: 2,
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
        ...sxProps,
      }}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      {...rest}
    ></DataGrid>
  );
};

export default DataTableFrame;
