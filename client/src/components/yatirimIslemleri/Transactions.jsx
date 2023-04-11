import styled from "styled-components";
import IslemForm from "./IslemForm";
import SonIslemler from "./SonIslemler";
import { useYatirimContext } from "../../context/yatirimContext";

const Transactions = () => {
  const {} = useYatirimContext();
  return (
    <TransactionsStyled>
      <IslemForm />
      <SonIslemler />
    </TransactionsStyled>
  );
};

const TransactionsStyled = styled.div`
  height: 900px;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export default Transactions;
