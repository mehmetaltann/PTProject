import { createContext, useState, useContext, useCallback } from "react";
import useHttp from "../hooks/use-http";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [guncelDegerler, setGuncelDegerler] = useState([]);
  const [portfoyler, setPortfoyler] = useState([]);
  const [yatirimData, setYatirimData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(2);
  const { sendRequest } = useHttp();

  const yatirimIslemleriniGetir = async () => {
    const transformData = (fetchData) => {
      let filteredData = fetchData.map(({ _id: id, ...rest }) => ({
        id,
        ...rest,
      }));
      
      setYatirimData(filteredData);
    };

    sendRequest(
      {
        method: "get",
        url: `yatirim-islem-sorgula/${selectedDate}`,
      },
      transformData
    );
  };

  const portfoyleriGetir = useCallback(async () => {
    const transformData = (fetchData) => {
      setPortfoyler(fetchData);
    };
    sendRequest(
      {
        method: "get",
        url: `portfoy-sorgula`,
      },
      transformData
    );
  }, []);

  const guncelDegerleriGetir = useCallback(async () => {
    const transformData = (fetchData) => {
      setGuncelDegerler(fetchData);
    };
    sendRequest(
      {
        method: "get",
        url: `guncel-deger-sorgula`,
      },
      transformData
    );
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        portfoyler,
        yatirimData,
        guncelDegerler,
        selectedDate,
        setSelectedDate,
        portfoyleriGetir,
        guncelDegerleriGetir,
        yatirimIslemleriniGetir,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
