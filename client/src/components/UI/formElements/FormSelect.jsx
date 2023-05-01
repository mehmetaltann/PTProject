import { TextField } from "@mui/material";
import { useYatirimContext } from "../../../context/yatirimContext";

const FormSelect = ({ children, form, field }) => {
  const { setSelectedPortfoy } = useYatirimContext();
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
        setSelectedPortfoy(e.target.value);
      }}
    >
      {children}
    </TextField>
  );
};

export default FormSelect;
