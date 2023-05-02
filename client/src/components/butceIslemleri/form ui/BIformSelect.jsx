import { TextField } from "@mui/material";

const BIformSelect = ({ children, label, form, field, disabled }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      label={label}
      type="text"
      disabled={disabled}
      sx={{ minWidth: 150}}
      name={name}
      value={value}
      onChange={(e) => setFieldValue(name, e.target.value)}
      size="small"
    >
      {children}
    </TextField>
  );
};

export default BIformSelect;
