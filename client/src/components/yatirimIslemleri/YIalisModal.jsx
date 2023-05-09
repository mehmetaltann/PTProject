import Grid from "@mui/material/Unstable_Grid2";
import YIformSelect from "./form_ui/YIformSelect";
import FormTextField from "../UI/formElements/FormTextField";
import FormDatePicker from "../UI/formElements/FormDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Yup from "yup";
import { materialDateInput } from "../../utils/help-functions";
import { useMemo, Fragment } from "react";
import { Form, Formik, FieldArray, Field } from "formik";
import { useYatirimContext } from "../../context/yatirimContext";

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
  kod: "",
  adet: 0,
  fiyat: 0,
  komisyon: 0,
};

const YIalisModal = ({
  setOpenAlis,
  selectedPortfoy,
  portfoyler,
  setSelectedPortfoy,
}) => {
  const initialFonInfoMemo = useMemo(() => initialFonInfo, []);
  const { yatirimKalemiAlisEkle } = useYatirimContext();

  const submitHandler = async (values) => {
    let portfoy_ismi = values.portfoy;
    const yeniKayitListesi = values.fons.map((fon) => {
      return {
        action: "Alış",
        kod: fon.kod.toUpperCase().trim(),
        adet: fon.adet,
        fiyat: fon.fiyat,
        komisyon: fon.komisyon,
        date: fon.date,
        portfoy_ismi: portfoy_ismi,
      };
    });
    yatirimKalemiAlisEkle(yeniKayitListesi);
    setSelectedPortfoy(portfoy_ismi);
    setOpenAlis(false);
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
          portfoy: selectedPortfoy,
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
                  name="portfoy"
                  component={YIformSelect}
                  label="Portföy"
                  minW={{ xs: 120, md: 200 }}
                >
                  {portfoyler.map((item) => (
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
                              name={`fons.${index}.kod`}
                              label="Kod"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.adet`}
                              label="Adet"
                              type="number"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.fiyat`}
                              label="Fiyat"
                              type="number"
                              size="small"
                            />
                          </Grid>
                          <Grid>
                            <FormTextField
                              sx={{ maxWidth: 100 }}
                              name={`fons.${index}.komisyon`}
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

export default YIalisModal;
