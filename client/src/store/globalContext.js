import { createContext, useState, useContext, useCallback } from "react";
import useHttp from "../hooks/use-http";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [portfoyler, setPortfoyler] = useState([]);
  const { sendRequest } = useHttp();

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

  return (
    <GlobalContext.Provider value={{ portfoyler, portfoyleriGetir }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
