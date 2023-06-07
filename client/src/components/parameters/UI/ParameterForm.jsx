import { Form, Formik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../UI/formElements/FormTextField";
import { setSnackbar } from "../../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import { Button, Stack } from "@mui/material";

const ParameterForm = ({ formName, addFunction }) => {
  const dispatch = useDispatch();

  async function submitHandler(values, { resetForm }) {
    const newRecord = {
      variant: formName,
      content: [
        {
          title: values.title,
          value: values.val,
        },
      ],
    };
    console.log(newRecord);
  }

  return (
    <Formik
      initialValues={{
        title: "",
        value: "",
      }}
      onSubmit={submitHandler}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Stack spacing={3} sx={{ p: 2 }}>
            <FormTextField
              sx={{ maxWidth: 250 }}
              name="title"
              label="İsim"
              size="small"
            />
            <FormTextField
              sx={{ maxWidth: 250 }}
              name="val"
              label="Değer"
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
  );
};

export default ParameterForm;

/*
    try {
      const res = await addFunction(newRecord).unwrap();
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
 */
