import { TextField } from "@mui/material";

const BIformSelect = ({ children, minW, label, form, field, disabled, name2 }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      label={label}
      type="text"
      disabled={disabled}
      sx={{ minWidth: minW }}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
        setFieldValue(name2, e.target.value);
      }}
      size="small"
    >
      {children}
    </TextField>
  );
};

export default BIformSelect;
