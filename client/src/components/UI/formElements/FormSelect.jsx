import { TextField } from "@mui/material";

const FormSelect = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      label="Fon seçimi"
      type="text"
      sx={{ minWidth: 220 }}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </TextField>
  );
};

export default FormSelect;
