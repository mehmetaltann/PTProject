import InvestmentForm from "../components/investments/form/InvestmentForm";
import DataTable from "../components/investments/table/DataTable";
import TableFilters from "../components/investments/table/TableFilters";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography, Paper } from "@mui/material";
import { PageWrapper, DataTableWrapper } from "../layouts/Wrappers";

const Investments = () => {
  return (
    <PageWrapper>
      <Grid container spacing={1}>
        <Grid xs={12} md={6}>
          <Paper>
            <Stack
              spacing={{ sm: 1 }}
              direction={{ sm: "row", xs: "column" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                p: 1,
                minHeight: "5rem",
                width: "100%",
                paddingLeft: { md: 3 },
                paddingRight: { md: 2 },
              }}
            >
              <Typography variant="h6" color="info.main">
                Yatırım İşlemleri
              </Typography>
              <InvestmentForm />
            </Stack>
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper>
            <Stack
              spacing={{ sm: 1 }}
              direction={{ sm: "row", xs: "column" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                p: 1,
                minHeight: "5rem",
                width: "100%",
                paddingLeft: { md: 2 },
                paddingRight: { md: 2 },
              }}
            >
              <Typography variant="h6" color="info.main">
                Filtreler
              </Typography>
              <TableFilters />
            </Stack>
          </Paper>
        </Grid>
        <Grid xs={12}>
          <Paper>
            <DataTableWrapper
              tableHeight={"74vh"}
              sxProps={{ p: { xs: 0, md: 2 } }}
            >
              <DataTable />
            </DataTableWrapper>
          </Paper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Investments;
