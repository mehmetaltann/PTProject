import Grid from "@mui/material/Unstable_Grid2";
import FormikFormSelect from "./UI/FormikFormSelect";
import FormTextField from "../../UI/formElements/FormTextField";
import FormDatePicker from "../../UI/formElements/FormDatePicker";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { materialDateInput } from "../../../utils/help-functions";
import { Fragment } from "react";
import { Form, Formik, Field } from "formik";
import { Button, Typography, MenuItem, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";
import { useAddSellMutation } from "../../../redux/apis/investmentApi";
import { pickPortfolio, setSnackbar } from "../../../redux/slices/generalSlice";

const SellFormikForm = ({ setOpenSatis }) => {
  const { selectedPortfolio } = useSelector((state) => state.general);
  const { data: portfolios } = useGetPortfoliosQuery();
  const [addSell] = useAddSellMutation();

  const dispatch = useDispatch();

  const submitHandler = async (values) => {
    const yeniKayitListesi = {
      code: values.code.toUpperCase().trim(),
      date: values.date,
      number: values.number,
      price: values.price,
      commission: values.commission,
      portfolio: values.portfolio,
    };
    try {
      const res = await addSell(yeniKayitListesi).unwrap();
      dispatch(pickPortfolio(values.portfolio));
      setOpenSatis(false);
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
  };

  const validateSchema = Yup.object().shape({
    portfolio: Yup.string().required("Gerekli"),
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
        Yeni Satış
      </Typography>
      <Box sx={{ p: 2, ml: 2 }}>
        <Formik
          initialValues={{
            date: materialDateInput,
            portfolio:
              selectedPortfolio === "Tümü"
                ? "Bireysel Emeklilik Fonları"
                : selectedPortfolio,
            code: "",
            number: 0,
            price: 0,
            commission: 0,
          }}
          onSubmit={submitHandler}
          validationSchema={validateSchema}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid>
                  <Field
                    name="portfolio"
                    component={FormikFormSelect}
                    label="Portföy"
                    minW={200}
                  >
                    {portfolios?.map((item) => (
                      <MenuItem value={item.title} key={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid>
                  <FormDatePicker name="date" label="Tarih" size="small" />
                </Grid>
                <Grid>
                  <FormTextField
                    sx={{ maxWidth: 120 }}
                    name="code"
                    label="Kod"
                    size="small"
                  />
                </Grid>
                <Grid>
                  <FormTextField
                    sx={{ maxWidth: 120 }}
                    name="number"
                    label="Adet"
                    type="number"
                    size="small"
                  />
                </Grid>
                <Grid>
                  <FormTextField
                    sx={{ maxWidth: 120 }}
                    name="price"
                    label="Fiyat"
                    type="number"
                    size="small"
                  />
                </Grid>
                <Grid>
                  <FormTextField
                    sx={{ maxWidth: 120 }}
                    name="commission"
                    label="Komisyon"
                    type="number"
                    size="small"
                  />
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ minWidth: 180, maxHeight: 55 }}
                    variant="contained"
                    color="error"
                    endIcon={<SendIcon />}
                  >
                    Ekle
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Fragment>
  );
};

export default SellFormikForm;
