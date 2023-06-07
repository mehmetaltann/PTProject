import PageConnectionWait from "../UI/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormTextField from "../UI/formElements/FormTextField";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";
import {
  useGetPortfoliosQuery,
  useDeletePortfolioMutation,
  useAddPortfolioMutation,
} from "../../redux/apis/portfolioApi";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

const PortfolioParameters = () => {
  const { data: portfolios, isLoading, isFetching } = useGetPortfoliosQuery();
  const [deletePortfolio] = useDeletePortfolioMutation();
  const [addPortfolio] = useAddPortfolioMutation();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!portfolios)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  async function submitHandler(values, { resetForm }) {
    const newRecord = { code: values.code, title: values.title };
    try {
      const res = await addPortfolio(newRecord).unwrap();
      resetForm();
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
  }

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{ p: 1, mb: 1 }}
        >
          Portföy Ekle
        </Typography>
        <Paper>
          <Formik
            initialValues={{
              code: "",
              title: "",
            }}
            onSubmit={submitHandler}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack spacing={3} sx={{ p: 2 }}>
                  <FormTextField
                    sx={{ maxWidth: 180 }}
                    name="code"
                    label="Kod"
                    size="small"
                  />
                  <FormTextField
                    sx={{ maxWidth: 180 }}
                    name="title"
                    label="İsim"
                    size="small"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ borderRadius: "5%", minWidth: 120 }}
                    size="large"
                    variant="contained"
                    color={"success"}
                    endIcon={<SendIcon />}
                  >
                    Ekle
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          Portföy Listesi
        </Typography>
        <TableContainer component={Paper} sx={{ width: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Kod</TableCell>
                <TableCell align="left">İsim</TableCell>
                <TableCell align="center">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={async () => {
                        try {
                          const res = await deletePortfolio(row.id).unwrap();
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
      </Grid>
    </Grid>
  );
};

export default PortfolioParameters;
