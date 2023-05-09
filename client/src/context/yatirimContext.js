import { createContext, useState, useContext } from "react";
import useHttp from "../hooks/use-http";

const BASE_URL = "http://localhost:1623/api/v1/";
export const YatirimContext = createContext();

export const YatirimProvider = ({ children }) => {
  const { error, setError, sendRequest } = useHttp();
  const [message, setMessage] = useState(null);

  const yatirimKalemiAlisEkle = async (postData) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "post",
        url: `yatirim-alis_ekle`,
        body: postData,
      },
      getMessage
    );
  };

  const yatirimKalemiSatisEkle = async (postData) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "post",
        url: `yatirim-satis-ekle`,
        body: postData,
      },
      getMessage
    );
  };

  const yatirimKalemiSil = async (id) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "delete",
        url: `yatirim-islem-sil/${id}`,
      },
      getMessage
    );
  };

  return (
    <YatirimContext.Provider
      value={{
        message,
        setMessage,
        error,
        setError,
        yatirimKalemiSil,
        yatirimKalemiAlisEkle,
        yatirimKalemiSatisEkle,
      }}
    >
      {children}
    </YatirimContext.Provider>
  );
};

export const useYatirimContext = () => {
  return useContext(YatirimContext);
};
