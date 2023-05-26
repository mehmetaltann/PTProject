import Grid from "@mui/material/Unstable_Grid2";
import InvestmentFormSelect from "./InvestmentFormSelect";
import FormTextField from "../../../UI/formElements/FormTextField";
import FormDatePicker from "../../../UI/formElements/FormDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Yup from "yup";
import { materialDateInput } from "../../../../utils/help-functions";
import { useMemo, Fragment } from "react";
import { Form, Formik, FieldArray, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { pickPortfolio } from "../../../../redux/portfoliosSlice";
import { postYatirimIslemleriAlis } from "../../../../redux/yatirimSlice";
import {
  Button,
  IconButton,
  Stack,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";

const initialFonInfo = {
  date: materialDateInput,
  code: "",
  number: 0,
  price: 0,
  commission: 0,
};

const InvestmentPurchaseModal = ({ setOpenAlis }) => {
  const initialFonInfoMemo = useMemo(() => initialFonInfo, []);
  const { portfolios, selectedPortfolio } = useSelector(
    (state) => state.portfolio
  );
  const dispatch = useDispatch();

  const submitHandler = async (values) => {
    let portfolio = values.portfolio;
    const yeniKayitListesi = values.fons.map((fon) => {
      return {
        action: "Alış",
        code: fon.code.toUpperCase().trim(),
        number: fon.number,
        price: fon.price,
        commission: fon.commission,
        date: fon.date,
        portfolio: portfolio,
      };
    });
    dispatch(postYatirimIslemleriAlis(yeniKayitListesi));
    dispatch(pickPortfolio(portfolio));
    setOpenAlis(false);
  };

  const validateSchema = Yup.object().shape({
    portfolio: Yup.string().required("Gerekli"),
    fons: Yup.array().of(
      Yup.object().shape({
        code: Yup.string()
          .min(3, "En az 3 Karakter")
          .max(5, "En fazla 5 Karakter")
          .required("Boş Olamaz"),
        number: Yup.number()
          .required("Gerekli")
          .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
        price: Yup.number()
          .required("Gerekli")
          .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
        commission: Yup.number(),
      })
    ),
  });

  return (
    <Fragment>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          borderBottom: 1,
          borderColor: "grey.500",
        }}
      >
        Yeni Alış
      </Typography>
      <Formik
        initialValues={{
          portfolio:
            selectedPortfolio === "Tümü"
              ? "Bireysel Emeklilik Fonları"
              : selectedPortfolio,
          fons: [initialFonInfoMemo],
        }}
        onSubmit={submitHandler}
        validationSchema={validateSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Stack spacing={3}>
              <Stack
                direction={{ md: "row", sx: "column" }}
                spacing={{ xs: 2 }}
              >
                <Field
                  name="portfolio"
                  component={InvestmentFormSelect}
                  label="Portföy"
                  minW={{ xs: 120, md: 200 }}
                >
                  {portfolios.map((item) => (
                    <MenuItem value={item.isim} key={item._id}>
                      {item.isim}
                    </MenuItem>
                  ))}
                </Field>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ minW: { xs: 120, md: 200 }, maxHeight: 55 }}
                  variant="contained"
                  color="success"
                  endIcon={<SendIcon />}
                >
                  Ekle
                </Button>
              </Stack>
              <Box>
                <FieldArray name="fons">
                  {({ push, remove }) => (
                    <Fragment>
                      {values.fons.map((i, index) => (
                        <Grid
                          container="true"
                          sx={{ pb: 2 }}
                          key={index}
                          spacing={1}
                        >
                          <Grid>
                            <FormDatePicker
                              name={`fons.${index}.date`}
                              label="Tarih"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.code`}
                              label="code"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.number`}
                              label="Adet"
                              type="number"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.price`}
                              label="Fiyat"
                              type="number"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.commission`}
                              label="Komisyon"
                              type="number"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <IconButton
                              type="button"
                              aria-label="delete"
                              onClick={() => remove(index)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <IconButton
                        onClick={() => push(initialFonInfoMemo)}
                        variant="contained"
                        size="small"
                        type="button"
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </FieldArray>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default InvestmentPurchaseModal;
