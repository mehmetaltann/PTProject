import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,Box
} from "@mui/material";

const BudgetStatisticsTable = ({ data }) => {
  const incomeData = data.filter((item) => item.type === "Gelir");
  const outcomeData = data.filter((item) => item.type === "Gider");

  const categoryAtotals = {};
  const categoryAincludes = {};
  const catB = {};
  for (const { categoryA, categoryB, amount } of outcomeData) {
    catB[categoryB] = (catB[categoryB] || 0) + Number(amount);
    categoryAincludes[categoryA] = catB;
    categoryAtotals[categoryA] =
      (categoryAtotals[categoryA] || 0) + Number(amount);
  }

  console.log(categoryAincludes);
  console.log(categoryAtotals);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant="h6" color={"success"}>
                Gelirler
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      Kategori A
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={2}>Kategori B</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant="h6" color={"error"}>
                Giderler
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Kategori A
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Kategori B</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BudgetStatisticsTable;
