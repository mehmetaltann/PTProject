import DeleteIcon from "@mui/icons-material/Delete";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";

const ParameterTable = ({ tableWidth, data, deleteFunction }) => {
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper} sx={{ width: tableWidth }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>İsim</TableCell>
            <TableCell align="left">Değer</TableCell>
            <TableCell align="center">İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  color="error"
                  onClick={async () => {
                    try {
                      const res = await deleteFunction(
                        row.value
                      ).unwrap();
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
                          severity: "error",
                        })
                      );
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterTable;
