import Grid from "@mui/material/Unstable_Grid2";
import YIformSelect from "../form_ui/YIformSelect";
import FormTextField from "../../../UI/formElements/FormTextField";
import FormDatePicker from "../../../UI/formElements/FormDatePicker";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { materialDateInput } from "../../../../utils/help-functions";
import { Fragment } from "react";
import { Form, Formik, Field } from "formik";
import { Button, Typography, MenuItem } from "@mui/material";
import { useYatirimContext } from "../../store/yatirimContext";

const YIsatisModal = () => {
  const {
    yatirimKalemiSatisEkle,
    selectedPortfoy,
    setSelectedPortfoy,
    portfoyler,
    setOpenSatis,
  } = useYatirimContext();

  const submitHandler = async (values) => {
    const yeniKayitListesi = {
      action: "Satış",
      kod: values.kod.toUpperCase().trim(),
      date: values.date,
      adet: values.adet,
      fiyat: values.fiyat,
      komisyon: values.komisyon,
      portfoy_ismi: values.portfoy,
    };
    yatirimKalemiSatisEkle(yeniKayitListesi);
    setSelectedPortfoy(values.portfoy);
    setOpenSatis(false);
  };

  const validateSchema = Yup.object().shape({
    portfoy: Yup.string().required("Gerekli"),
    kod: Yup.string()
      .min(3, "En az 3 Karakter")
      .max(5, "En fazla 5 Karakter")
      .required("Boş Olamaz"),
    adet: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
    fiyat: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
    komisyon: Yup.number(),
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
          portfoy: selectedPortfoy,
          kod: "",
          adet: 0,
          fiyat: 0,
          komisyon: 0,
        }}
        onSubmit={submitHandler}
        validationSchema={validateSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid>
                <Field
                  name="portfoy"
                  component={YIformSelect}
                  label="Portföy"
                  minW={200}
                >
                  {portfoyler.map((item) => (
                    <MenuItem value={item.isim} key={item._id}>
                      {item.isim}
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
                  name="kod"
                  label="Kod"
                  size="small"
                />
              </Grid>
              <Grid>
                <FormTextField
                  sx={{ maxWidth: 120 }}
                  name="adet"
                  label="Adet"
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid>
                <FormTextField
                  sx={{ maxWidth: 120 }}
                  name="fiyat"
                  label="Fiyat"
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid>
                <FormTextField
                  sx={{ maxWidth: 120 }}
                  name="komisyon"
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

export default YIsatisModal;
