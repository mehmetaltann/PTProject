import IslemForm from "./IslemForm";
import SonIslemler from "./SonIslemler";
import { useYatirimContext } from "../../context/yatirimContext";
import { useEffect } from "react";
import { YatirimLayout } from "../../styles/Layout";

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
    <YatirimLayout>
      <IslemForm />
      <SonIslemler />
    </YatirimLayout>
  );
};

export default Transactions;
