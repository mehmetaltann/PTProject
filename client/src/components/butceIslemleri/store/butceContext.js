import { createContext, useState, useContext } from "react";
import useHttp from "../../../hooks/use-http";

export const BASE_URL = "http://localhost:1623/api/v1/";
export const ButceContext = createContext();

export const ButceProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(2);
  const [message, setMessage] = useState("");
  const { error, setError, sendRequest } = useHttp();

  const butceKalemiSil = async (id) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "delete",
        url: `butce-veri-sil/${id}`,
      },
      getMessage
    );
  };

  const butceKalemEkle = async (postData) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "post",
        url: `butce-veri-ekle`,
        body: postData,
      },
      getMessage
    );
  };

  return (
    <ButceContext.Provider
      value={{
        data,
        error,
        message,
        setError,
        setMessage,
        selectedDate,
        setSelectedDate,
        butceKalemiSil,
        butceKalemEkle,
      }}
    >
      {children}
    </ButceContext.Provider>
  );
};

export const useButceContext = () => {
  return useContext(ButceContext);
};
