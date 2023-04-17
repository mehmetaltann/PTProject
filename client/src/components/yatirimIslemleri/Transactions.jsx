import styled from "styled-components";
import IslemForm from "./IslemForm";
import SonIslemler from "./SonIslemler";
import { useYatirimContext } from "../../context/yatirimContext";
import { useEffect } from "react";

const Transactions = () => {
  const {
    yatirimIslemleriSorgula,
    selectedPortfoy,
    portfoySorgula,
    portfoyler,
  } = useYatirimContext();

  useEffect(() => {
    yatirimIslemleriSorgula();
    portfoySorgula();
  }, [selectedPortfoy, yatirimIslemleriSorgula, portfoyler]);

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
