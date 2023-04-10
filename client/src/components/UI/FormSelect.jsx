import Select from "react-select";
import styled from "styled-components";
import { useField, ErrorMessage } from "formik";

const FormSelect = ({ name, options, defaultValue }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormSelectStyled>
      <Select
        menuPlacement="auto"
        menuPosition="fixed"
        name={name}
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        options={options}
        onBlur={() => helpers.setTouched(true)}
        defaultValue={defaultValue || "Seçiniz..."}
      />
      <ErrorMessage name={name} />
    </FormSelectStyled>
  );
};

const FormSelectStyled = styled.div`
  width: 40%;
  font-family: inherit;
`;

export default FormSelect;
