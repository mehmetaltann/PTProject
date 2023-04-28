import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useYatirimContext } from "../../context/yatirimContext";
import { YGdataTableColumns as COLUMNS } from "./YGdataTableColumns";

const YGdataTable = () => {
  const { gecmisIslemler } = useYatirimContext();
  const columns = useMemo(() => COLUMNS, []);
  console.log(gecmisIslemler)

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={gecmisIslemler}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
};

export default YGdataTable;
