import { Field, getIn } from "formik";
import styled from "styled-components";

const ErrorMessage = ({ name }) => (
  <ErrorMessageStyled>
    <Field name={name}>
      {({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    </Field>
  </ErrorMessageStyled>
);

const ErrorMessageStyled = styled.div`
  font-size: 0.8rem;
  color: var(--theme-red);
  opacity: 0.8;
  margin-top: 2px;
  margin-left: 10px;
`;

export default ErrorMessage;
