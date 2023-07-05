import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  IconButton,
  Collapse,
  Box,
  Stack,
} from "@mui/material";

const BudgetStatisticsTable = ({ data, monthNumber }) => {
  const incomeData = data.filter((item) => item.type === "Gelir");
  const outcomeData = data.filter((item) => item.type === "Gider");

  const totalIncome = incomeData.reduce((n, { amount }) => n + amount, 0);
  const totalOutcome = outcomeData.reduce((n, { amount }) => n + amount, 0);
  const totalBalance = totalIncome - totalOutcome;

  function transformData(data) {
    const catBlist = Object.values(
      data.reduce((agg, item) => {
        if (agg[item.categoryB] === undefined)
          agg[item.categoryB] = {
            label: item.categoryB,
            value: 0,
            up: item.categoryA,
          };
        agg[item.categoryB].value += +item.amount;
        return agg;
      }, {})
    );

    const catAlist = Object.values(
      data.reduce((agg, item) => {
        if (agg[item.categoryA] === undefined)
          agg[item.categoryA] = { label: item.categoryA, value: 0, alt: [] };
        agg[item.categoryA].value += +item.amount;
        return agg;
      }, {})
    );

    catAlist.map((itemA) => {
      catBlist.map((itemB) => {
        if (itemA.label === itemB.up) {
          itemA.alt.push(itemB);
        }
      });
    });

    return catAlist;
  }

  function Row({ row }) {
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            {row.label}
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">
              {(+row.value / monthNumber).toFixed(2)}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle1">{row.value.toFixed(2)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Gider Alt Kategori</TableCell>
                      <TableCell align="left">Aylık Ortalama</TableCell>
                      <TableCell align="left">Toplam Tutar (TL)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.alt.map((catBrow) => (
                      <TableRow key={catBrow.value}>
                        <TableCell scope="row">{catBrow.label}</TableCell>
                        <TableCell>
                          {(+catBrow.value / monthNumber).toFixed(2)}
                        </TableCell>
                        <TableCell>{catBrow.value.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  return (
    <Stack spacing={1}>
      <TableContainer component={Paper}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ p: 2, pb: 0 }}
        >
          <Typography variant="h6" gutterBottom color="success.main">
            Gelir
          </Typography>
          <Typography variant="h6" gutterBottom color="success.main">
            {`${totalIncome.toFixed(2)} TL`}
          </Typography>
        </Stack>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Gelir Kategori</TableCell>
              <TableCell align="right">Aylık Ortalama</TableCell>
              <TableCell align="right">Toplam Tutar (TL)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transformData(incomeData).map((row) => (
              <Row key={row.value} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ p: 2, pb: 0 }}
        >
          <Typography variant="h6" gutterBottom color="error">
            Gider
          </Typography>
          <Typography variant="h6" gutterBottom color="error">
            {`${totalOutcome.toFixed(2)} TL`}
          </Typography>
        </Stack>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Gider Kategori</TableCell>
              <TableCell align="right">Aylık Ortalama</TableCell>
              <TableCell align="right">Toplam Tutar (TL)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transformData(outcomeData).map((row) => (
              <Row key={row.value} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper>
        <Stack direction={"row"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom color="info.main">
            Bütçe Durum
          </Typography>
          {totalBalance < 0 ? (
            <Typography variant="h6" gutterBottom color="error">
              {`- ${totalBalance.toFixed(2)} TL`}
            </Typography>
          ) : (
            <Typography variant="h6" gutterBottom color="success.main">
              {`+ ${totalBalance.toFixed(2)} TL`}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default BudgetStatisticsTable;
