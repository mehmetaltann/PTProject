import { createContext, useState, useContext } from "react";
import useHttp from "../hooks/use-http";

export const BASE_URL = "http://localhost:1623/api/v1/";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { loading, error, setError, sendRequest } = useHttp();
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(2);
  const [data, setData] = useState([]);

  const butceKalemSorgula = async (selectedDate) => {
    const transformData = (fetchData) => {
      let filteredData = fetchData.map(({ _id: id, ...rest }) => ({
        id,
        ...rest,
      }));
      setData(filteredData);
    };

    sendRequest(
      {
        method: "get",
        url: `butce-sorgula/${selectedDate}`,
      },
      transformData
    );
  };

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
    <GlobalContext.Provider
      value={{
        butceKalemSorgula,
        butceKalemiSil,
        butceKalemEkle,
        message,
        setMessage,
        error,
        setError,
        data,
        setData,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
