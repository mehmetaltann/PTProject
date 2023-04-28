import Grid from "@mui/material/Unstable_Grid2";
import FormTextField from "../UI/formElements/FormTextField";
import FormSelect from "../UI/formElements/FormSelect";
import FormDatePicker from "../UI/formElements/FormDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { Fragment, useState } from "react";
import { Form, Formik, FieldArray } from "formik";
import { useYatirimContext } from "../../context/yatirimContext";
import { materialDateInput } from "../../utils/help-functions";
import {
  Card,
  CardContent,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const YIform = () => {
  const { yatirimIslemiEkle, selectedPortfoy, portfoyler } =
    useYatirimContext();
  const [islemTuru, setIslemTuru] = useState("Alış");

  const initialFonInfo = {
    date: materialDateInput,
    kod: "",
    adet: 0,
    fiyat: 0,
    komisyon: 0,
  };

  const submitHandler = async (values, { resetForm }) => {
    let portfoy_ismi = values.portfoy;
    const yeniKayitListesi = values.fons.map((fon) => {
      return {
        action: islemTuru,
        kod: fon.kod.toUpperCase().trim(),
        date: fon.date,
        adet: fon.adet,
        fiyat: fon.fiyat,
        komisyon: fon.komisyon,
        portfoy_ismi: portfoy_ismi,
      };
    });
    yatirimIslemiEkle(yeniKayitListesi);
    //yeniKayitListesi.map((kayit) => yatirimKalemiEkle(kayit));
    resetForm({
      values: { portfoy: selectedPortfoy, fons: [initialFonInfo] },
    });
  };

  const validateSchema = Yup.object().shape({
    portfoy: Yup.string().required("Gerekli"),
    fons: Yup.array().of(
      Yup.object().shape({
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
      })
    ),
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          sx={{ borderBottom: 1, mb: 4, borderColor: "grey.500" }}
        >
          Alış Satış İşlemleri
        </Typography>
        <Formik
          initialValues={{
            portfoy: "Bireysel Emeklilik Fonları",
            fons: [initialFonInfo],
          }}
          onSubmit={submitHandler}
          validationSchema={validateSchema}
        >
          {({ values, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <Grid
                container
                justifyContent={{ lg: "space-between" }}
                direction={{ sm: "row", xs: "column" }}
                spacing={{ lg: 0, xs: 2 }}
              >
                <Grid item="true" order={{ xs: 1, sm: 0, lg: 0 }}>
                  <FormSelect
                    sx={{ minWidth: 220 }}
                    label="Fon seçimi"
                    type="text"
                    name="portfoy"
                    options={portfoyler}
                    attr="isim"
                    defaultValue="Bireysel Emeklilik Fonları"
                  ></FormSelect>
                </Grid>
                <Grid order={{ xs: 2, sm: 2, lg: 1 }}>
                  <FieldArray name="fons">
                    {({ push, remove }) => (
                      <Fragment>
                        {values.fons.map((i, index) => (
                          <Grid
                            container="true"
                            item="true"
                            sx={{ pb: 2 }}
                            key={index}
                            spacing={{ sm: 1, xs: 2, lg: 0 }}
                          >
                            <Grid item="true">
                              <FormDatePicker
                                name={`fons.${index}.date`}
                                label="Tarih"
                                size="small"
                              />
                            </Grid>
                            <Grid item="true">
                              <FormTextField
                                sx={{ maxWidth: 100 }}
                                name={`fons.${index}.kod`}
                                label="Kod"
                                size="small"
                              />
                            </Grid>
                            <Grid item="true">
                              <FormTextField
                                sx={{ maxWidth: 100 }}
                                name={`fons.${index}.adet`}
                                label="Adet"
                                type="number"
                                size="small"
                              />
                            </Grid>
                            <Grid item="true">
                              <FormTextField
                                sx={{ maxWidth: 100 }}
                                name={`fons.${index}.fiyat`}
                                label="Fiyat"
                                type="number"
                                size="small"
                              />
                            </Grid>
                            <Grid item="true">
                              <FormTextField
                                sx={{ maxWidth: 100 }}
                                name={`fons.${index}.komisyon`}
                                label="Komisyon"
                                type="number"
                                size="small"
                              />
                            </Grid>
                            <Grid item="true">
                              <IconButton
                                aria-label="delete"
                                onClick={() => remove(index)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item="true">
                          <Button
                            onClick={() => push(initialFonInfo)}
                            variant="contained"
                            size="small"
                          >
                            Ekle
                          </Button>
                        </Grid>
                      </Fragment>
                    )}
                  </FieldArray>
                </Grid>

                <Grid order={{ xs: 0, sm: 1, lg: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => setIslemTuru("Alış")}
                      sx={{ borderRadius: "5%", minWidth: 120 }}
                      size="large"
                      variant="contained"
                      color="success"
                      endIcon={<SendIcon />}
                    >
                      Alış
                    </Button>
                    <Button
                      onClick={() => setIslemTuru("Satış")}
                      disabled={isSubmitting}
                      type="submit"
                      sx={{ borderRadius: "5%", minWidth: 120 }}
                      size="large"
                      variant="contained"
                      color="error"
                      endIcon={<SendIcon />}
                    >
                      Satış
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default YIform;
