import styled from "styled-components";
import IslemForm from "./IslemForm";
import { useYatirimContext } from "../../context/yatirimContext";

const Transactions = () => {
  const {} = useYatirimContext();
  return (
    <TransactionsStyled>
      <IslemForm />
    </TransactionsStyled>
  );
};

const TransactionsStyled = styled.div`
  height: 900px;
  width: 100%;
  padding-top: 1rem;
  display: flex;

`;

export default Transactions;
