import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const FormSelect = ({ name, attr, defaultValue, options, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext;

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configTextField = {
    select: true,
    ...field,
    ...otherProps,
    defaultValue: defaultValue,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <TextField {...configTextField}>
      {options.map((item, index) => (
        <MenuItem value={item[attr]} key={index}>
          {item[attr]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormSelect;
