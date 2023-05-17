import { YatirimProvider } from "../components/yatirimIslemleri/store/yatirimContext";
import { useGlobalContext } from "../store/globalContext";
import { useEffect } from "react";
import YImain from "../components/yatirimIslemleri/YImain";

const YatirimIslemleri = () => {
  const { yatirimIslemleriniGetir, selectedDate } = useGlobalContext();

  return (
    <YatirimProvider>
      <YImain />
    </YatirimProvider>
  );
};

export default YatirimIslemleri;
