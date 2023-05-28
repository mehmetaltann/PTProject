import Grid from "@mui/material/Unstable_Grid2";
import InvestmentFormSelect from "./InvestmentFormSelect";
import FormTextField from "../../UI/formElements/FormTextField";
import FormDatePicker from "../../UI/formElements/FormDatePicker";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { materialDateInput } from "../../../utils/help-functions";
import { Fragment } from "react";
import { Form, Formik, Field } from "formik";
import { Button, Typography, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { pickPortfolio } from "../../../redux/portfoliosSlice";
import { useGetPortfoliosQuery } from "../../../redux/api/portfolioApi";
import { useAddSellMutation } from "../../../redux/api/investmentApi";
import { setMessage } from "../../../redux/slices/generalSlice";

const SellModal = ({ setOpenSatis }) => {
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
      dispatch(setMessage(res));
      dispatch(pickPortfolio(values.portfolio));
      setOpenSatis(false);
    } catch (error) {
      console.log(error);
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
                  component={InvestmentFormSelect}
                  label="Portföy"
                  minW={200}
                >
                  {portfolios?.map((item) => (
                    <MenuItem value={item.code} key={item.id}>
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
    </Fragment>
  );
};

export default SellModal;
