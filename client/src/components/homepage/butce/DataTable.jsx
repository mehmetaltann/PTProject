import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DataTable = () => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4, ml:4 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bütçe Kalemi</TableCell>
            <TableCell align="right">Tutar</TableCell>
            <TableCell align="right">Durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Gelir</TableCell>
            <TableCell align="right">15482 TL</TableCell>
            <TableCell align="right">15482 TL</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gider</TableCell>
            <TableCell align="right">25845 TL</TableCell>
            <TableCell align="right">15482 TL</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
