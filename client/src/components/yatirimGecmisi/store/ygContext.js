import { createContext, useState, useContext } from "react";
import useHttp from "../../../hooks/use-http";

export const YGContext = createContext();

export const YGProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(2);
  const { error, setError, sendRequest } = useHttp();

  const gecmisIslemSil = async (id) => {
    const getMessage = (fetchData) => {
      let resMessage = fetchData.message;
      setMessage(resMessage);
    };
    sendRequest(
      {
        method: "delete",
        url: `gecmis-islem-sil/${id}`,
      },
      getMessage
    );
  };

  return (
    <YGContext.Provider
      value={{
        gecmisIslemSil,
        setSelectedDate,
        selectedDate,
        error,
        setError,
        message,
        setMessage,
      }}
    >
      {children}
    </YGContext.Provider>
  );
};

export const useYGContext = () => {
  return useContext(YGContext);
};
