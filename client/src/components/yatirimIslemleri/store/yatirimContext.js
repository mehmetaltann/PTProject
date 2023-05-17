import { createContext, useState, useContext } from "react";
import { useGlobalContext } from "../../../store/globalContext";
import useHttp from "../../../hooks/use-http";

export const YatirimContext = createContext();

export const YatirimProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(2);
  const [openAlis, setOpenAlis] = useState(false);
  const [openSatis, setOpenSatis] = useState(false);
  const [selectedPortfoy, setSelectedPortfoy] = useState(
    "Bireysel Emeklilik Fonları"
  );
  const { error, setError, sendRequest } = useHttp();
  const { yatirimIslemleriniGetir } = useGlobalContext();

  const yatirimKalemiAlisEkle = async (postData) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "post",
        url: `yatirim-alis-ekle`,
        body: postData,
      },
      getMessage
    );
    yatirimIslemleriniGetir();
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
    yatirimIslemleriniGetir();
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
    yatirimIslemleriniGetir();
  };

  return (
    <YatirimContext.Provider
      value={{
        error,
        message,
        openAlis,
        openSatis,
        selectedDate,
        selectedPortfoy,

        setError,
        setMessage,
        setOpenAlis,
        setOpenSatis,
        setSelectedDate,
        setSelectedPortfoy,

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
