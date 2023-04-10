import styled from "styled-components";
import { useField } from "formik";
import DatePicker from "react-datepicker";

const FormDatePicker = (props) => {
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <FormDatePickerStyled>
      <DatePicker
        {...field}
        {...props}
        selected={value}
        onChange={(date) => setValue(date)}
      />
    </FormDatePickerStyled>
  );
};

const FormDatePickerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  gap: 0.53rem;

  label {
    display:block;
    width: 100%;
    font-size: 1rem;
  }

  input {
    display:block;
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    border: none;
    padding: 0.3rem 0.8rem;
    border-radius: 10px;
    resize: none;
    border: var(--theme-inputBorder);
    box-shadow: var(--theme-box-shadow);
    color: var(--theme-fourth);
    opacity: 0.8;

    &:focus {
      border-color: var(--theme-fourth);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 3px rgba(0, 126, 255, 0.1);
      outline: none;
    }

    &::placeholder {
      color: var(--theme-fourth);
      opacity: 0.6;
    }
  }
`;

export default FormDatePicker;
