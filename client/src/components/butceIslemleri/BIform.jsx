import * as Yup from "yup";
import useAxios from "../../hooks/useAxios";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import BIformSelect from "./form ui/BIformSelect";
import FormTextField from "../UI/formElements/FormTextField";
import FormDatePicker from "../UI/formElements/FormDatePicker";
import React, { useState, useMemo, useEffect, Fragment } from "react";
import { uniqListFunc } from "../../utils/help-functions";
import { Form, Formik, FieldArray, Field } from "formik";
import { materialDateInput } from "../../utils/help-functions";

import {
  Card,
  CardContent,
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
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const BIform = React.memo(() => {
  const [open, setOpen] = useState({ durum: false, type: "Gelir" });
  const [category, setCategory] = useState([]);

  const { response } = useAxios({
    method: "get",
    url: "category-sorgula",
  });

  useEffect(() => {
    if (response !== null) {
      setCategory(response);
    }
  }, [response]);

  console.log("render");

  const handleGelirOpen = () => setOpen({ durum: true, type: "Gelir" });
  const handleGiderOpen = () => setOpen({ durum: true, type: "Gider" });
  const handleClose = () => setOpen(false);

  const initialButceData = {
    title: "",
    date: materialDateInput,
    amount: 0,
    description: "",
    categoryB: "",
  };

  const initialButceDataMemo = useMemo(() => initialButceData, []);

  const submitHandler = async (values) => {};

  const validateSchema = Yup.object().shape({});

  return (
    <Card variant="outlined">
      <CardContent>
        <Button onClick={handleGelirOpen}>Gelir Ekle</Button>
        <Button onClick={handleGiderOpen}>Gider Ekle</Button>
        <Modal
          open={open.durum}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
              {open.type} Ekle
            </Typography>
            <Formik
              initialValues={{
                categoryA: "",
                categoryB: "",
                infos: [initialButceDataMemo],
              }}
              onSubmit={submitHandler}
              validationSchema={validateSchema}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <Grid container direction={"column"}>
                    <Grid item="true" sx={{ pb: 3 }}>
                      <Field
                        name="categoryA"
                        component={BIformSelect}
                        label="Kategori A"
                      >
                        {uniqListFunc(
                          category.filter((cat) => cat.type === open.type),
                          "categoryA"
                        ).map((catA, index) => (
                          <MenuItem value={catA.categoryA} key={index}>
                            {catA.categoryA}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>

                    <Grid container item="true">
                      <FieldArray name="infos">
                        {({ push, remove }) => (
                          <Fragment>
                            {values.infos.map((i, index) => (
                              <Grid container="true" item="true" spacing={2}>
                                <Grid item="true">
                                  <FormDatePicker
                                    name={`infos.${index}.date`}
                                    label="Tarih"
                                    size="small"
                                  />
                                </Grid>

                                <Grid item>
                                  {values.categoryA ? (
                                    <Field
                                      name="categoryB"
                                      component={BIformSelect}
                                      label="Kategori B"
                                    >
                                      {category
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
                                      name="categoryB"
                                      component={BIformSelect}
                                      label="Kategori B"
                                      disabled="disabled"
                                    ></Field>
                                  )}
                                </Grid>
                                <Grid item="true">
                                  <FormTextField
                                    sx={{ maxWidth: 100 }}
                                    name={`infos.${index}.title`}
                                    label={`${open.type} adı`}
                                    size="small"
                                  />
                                </Grid>
                                <Grid item="true">
                                  <FormTextField
                                    sx={{ maxWidth: 100 }}
                                    name={`infos.${index}.amount`}
                                    label="Tutar"
                                    type="number"
                                    size="small"
                                  />
                                </Grid>
                                <Grid item="true">
                                  <FormTextField
                                    name={`infos.${index}.description`}
                                    label="Açıklama"
                                    multiline
                                    type="text"
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
                                onClick={() => push(initialButceDataMemo)}
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
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
});

export default BIform;
