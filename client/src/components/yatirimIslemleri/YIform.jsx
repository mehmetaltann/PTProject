import Grid from "@mui/material/Unstable_Grid2";
import FormTextField from "../UI/formElements/FormTextField";
import FormSelect from "../UI/formElements/FormSelect";
import FormDatePicker from "../UI/formElements/FormDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useHttp from "../../hooks/use-http";
import * as Yup from "yup";
import { Fragment, useState, useMemo, useEffect } from "react";
import { Form, Formik, FieldArray, Field } from "formik";
import { materialDateInput } from "../../utils/help-functions";
import { useYatirimContext } from "../../context/yatirimContext";
import {
  Button,
  IconButton,
  Stack,
  Typography,
  MenuItem,
  Modal,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "70%",
  width: "50%",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const YIform = () => {
  const [open, setOpen] = useState({ durum: false, type: "Alış" });
  const [islemTuru, setIslemTuru] = useState("Alış");
  const [portfoyler, setPortfoyler] = useState([]);
  const { sendRequest } = useHttp();

  const handleAlisOpen = () => setOpen({ durum: true, type: "Alış" });
  const handleSatisOpen = () => setOpen({ durum: true, type: "Satış" });
  const handleClose = () => setOpen({ durum: false, type: "Alış" });

  const { selectedPortfoy, yatirimIslemiEkle } = useYatirimContext();

  useEffect(() => {
    const transformData = (fetchData) => {
      setPortfoyler(fetchData);
    };

    sendRequest(
      {
        method: "get",
        url: `portfoy-sorgula`,
      },
      transformData
    );
  }, [sendRequest]);

  const initialFonInfo = {
    date: materialDateInput,
    kod: "",
    adet: 0,
    fiyat: 0,
    komisyon: 0,
  };

  const initialFonInfoMemo = useMemo(() => initialFonInfo, []);

  const submitHandler = async (values) => {
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
    console.log(yeniKayitListesi);
    handleClose();
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
    <Stack direction="row" justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
      <Button
        type="button"
        onClick={handleAlisOpen}
        variant="outlined"
        color="success"
        size="large"
        endIcon={<SendIcon />}
        sx={{ minWidth: 150 }}
      >
        Alış
      </Button>
      <Button
        endIcon={<SendIcon />}
        type="button"
        onClick={handleSatisOpen}
        variant="outlined"
        color="error"
        size="large"
        sx={{ minWidth: 150 }}
      >
        Satış
      </Button>
      <Modal
        open={open.durum}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: "grey.500",
            }}
          >
            Yeni {open.type}
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
                  <Stack direction="row" spacing={2}>
                    <Field
                      name="portfoy"
                      defaultValue="Bireysel Emeklilik Fonları"
                      component={FormSelect}
                    >
                      {portfoyler.map((item, index) => (
                        <MenuItem value={item["isim"]} key={index}>
                          {item["isim"]}
                        </MenuItem>
                      ))}
                    </Field>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ minWidth: 180, maxHeight: 55 }}
                      variant="contained"
                      color={open.type === "Alış" ? "success" : "error"}
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
        </Box>
      </Modal>
    </Stack>
  );
};

export default YIform;
