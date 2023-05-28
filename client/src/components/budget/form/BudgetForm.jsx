import * as Yup from "yup";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormSelect from "./FormSelect";
import FormTextField from "../../UI/formElements/FormTextField";
import FormDatePicker from "../../UI/formElements/FormDatePicker";
import { useState, useMemo, Fragment } from "react";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi";
import { uniqListFunc } from "../../../utils/help-functions";
import { Form, Formik, FieldArray, Field } from "formik";
import { materialDateInput } from "../../../utils/help-functions";
import { useDispatch } from "react-redux";
import { useAddBudgetItemMutation } from "../../../redux/api/budgetApi";
import { setMessage } from "../../../redux/slices/generalSlice";
import {
  Typography,
  MenuItem,
  Modal,
  Button,
  IconButton,
  Box,
  Stack,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "70%",
  width: "70%",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const BudgetForm = () => {
  const [open, setOpen] = useState({ state: false, type: "Gelir" });
  const { data: categories } = useGetCategoriesQuery();
  const [addBudgetItem] = useAddBudgetItemMutation();
  const dispatch = useDispatch();
  const handleGelirOpen = () => setOpen({ state: true, type: "Gelir" });
  const handleGiderOpen = () => setOpen({ state: true, type: "Gider" });
  const handleClose = () => setOpen({ state: false, type: "Gelir" });

  const initialButceData = {
    title: "",
    date: materialDateInput,
    amount: 0,
    description: "",
    categoryB: "",
  };
  const initialButceDataMemo = useMemo(() => initialButceData, []);

  const submitHandler = async (values) => {
    let category_a = values.categoryA;
    const yeniKayitListesi = values.infos.map((info) => {
      return {
        title: info.title,
        amount: info.amount,
        type: open.type,
        date: info.date,
        categoryA: category_a,
        categoryB: info.categoryB,
        description: info.description,
      };
    });
    try {
      const res = await addBudgetItem(yeniKayitListesi).unwrap();
      dispatch(setMessage(res));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const validateSchema = Yup.object().shape({
    categoryA: Yup.string().required("Gerekli"),
    infos: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Boş Olamaz"),
        amount: Yup.number()
          .required("Gerekli")
          .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
        categoryB: Yup.string().required("Gerekli"),
      })
    ),
  });

  return (
    <Stack direction="row" justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
      <Button
        type="button"
        onClick={handleGelirOpen}
        variant="outlined"
        color="success"
        size="large"
        startIcon={<AddCircleIcon />}
      >
        Gelir Ekle
      </Button>
      <Button
        startIcon={<AddCircleIcon />}
        type="button"
        onClick={handleGiderOpen}
        variant="outlined"
        color="error"
        size="large"
      >
        Gider Ekle
      </Button>
      <Modal
        open={open.state}
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
              categoryA: "",
              infos: [initialButceDataMemo],
            }}
            onSubmit={submitHandler}
            validationSchema={validateSchema}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <Field
                      name="categoryA"
                      component={FormSelect}
                      label="Kategori A"
                      minW={200}
                    >
                      {uniqListFunc(
                        categories.filter((cat) => cat.type === open.type),
                        "categoryA"
                      ).map((catA, index) => (
                        <MenuItem value={catA.categoryA} key={index}>
                          {catA.categoryA}
                        </MenuItem>
                      ))}
                    </Field>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ borderRadius: "5%", minWidth: 120 }}
                      size="large"
                      variant="contained"
                      color={open.type === "Gelir" ? "success" : "error"}
                      endIcon={<SendIcon />}
                    >
                      Ekle
                    </Button>
                  </Stack>

                  <Box>
                    <FieldArray name="infos">
                      {({ push, remove }) => (
                        <Fragment>
                          {values.infos.map((i, index) => (
                            <Grid
                              container="true"
                              spacing={{ xs: 2, md: 1 }}
                              sx={{ mb: 1 }}
                              key={index}
                            >
                              <Grid>
                                <FormDatePicker
                                  name={`infos.${index}.date`}
                                  label="Tarih"
                                  size="small"
                                />
                              </Grid>
                              <Grid>
                                {values.categoryA ? (
                                  <Field
                                    name={`infos.${index}.categoryB`}
                                    component={FormSelect}
                                    label="Kategori B"
                                    name2={`infos.${index}.title`}
                                    minW={150}
                                  >
                                    {categories
                                      .filter((cat) => cat.type === open.type)
                                      .filter(
                                        (cat) =>
                                          cat.categoryA === values.categoryA
                                      )
                                      .map((catA, index) => (
                                        <MenuItem
                                          value={catA.categoryB}
                                          key={index}
                                        >
                                          {catA.categoryB}
                                        </MenuItem>
                                      ))}
                                  </Field>
                                ) : (
                                  <Field
                                    name={`infos.${index}.categoryB`}
                                    component={FormSelect}
                                    label="Kategori B"
                                    disabled
                                    minW={150}
                                  >
                                    <MenuItem value="Seçiniz">
                                      "Seçiniz"
                                    </MenuItem>
                                  </Field>
                                )}
                              </Grid>
                              <Grid>
                                <FormTextField
                                  sx={{ maxWidth: 180 }}
                                  name={`infos.${index}.title`}
                                  label={`${open.type} adı`}
                                  size="small"
                                />
                              </Grid>
                              <Grid>
                                <FormTextField
                                  sx={{ maxWidth: 100 }}
                                  name={`infos.${index}.amount`}
                                  label="Tutar"
                                  type="number"
                                  size="small"
                                />
                              </Grid>
                              <Grid>
                                <FormTextField
                                  name={`infos.${index}.description`}
                                  label="Açıklama"
                                  multiline
                                  type="text"
                                  size="small"
                                />
                              </Grid>
                              <Grid>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => remove(index)}
                                  size="small"
                                  type="button"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                          <IconButton
                            onClick={() => push(initialButceDataMemo)}
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

export default BudgetForm;
