import { TextField } from "@mui/material";

const InvestmentFormSelect = ({ children, minW, label, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      label={label}
      type="text"
      sx={{ minWidth: minW }}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      size="small"
    >
      {children}
    </TextField>
  );
};

export default InvestmentFormSelect;
