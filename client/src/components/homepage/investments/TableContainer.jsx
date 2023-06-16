import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AltanSelect from "../../UI/AltanSelect";
import { useSelector } from "react-redux";
import { pickPortfolio } from "../../../redux/slices/generalSlice";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";
import { Typography } from "@mui/material";

const TableContainer = () => {
  const { selectedPortfolio } = useSelector((state) => state.general);
  const { data: portfolios, isLoading, isFetching } = useGetPortfoliosQuery();

  if (isLoading && isFetching) return null;
  if (!portfolios) return null;

  return (
    <Grid
      container
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid>
        <Typography
          variant="h6"
          sx={{
            color: "info.main",
            p: 1,
            ml: 2,
          }}
        >
          Aktif Yatırım Kalemleri
        </Typography>
      </Grid>
      <Grid>
        <AltanSelect
          id="portfoy"
          defaultValue="Tümü"
          value={selectedPortfolio}
          minWidth="25ch"
          onChange={pickPortfolio}
          data={portfolios}
          dataTextAttr="title"
          dataValueAttr="title"
          isAll={true}
        />
      </Grid>
    </Grid>
  );
};

export default TableContainer;
