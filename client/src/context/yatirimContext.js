import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const YatirimContext = createContext();

export const YatirimProvider = ({ children }) => {
  const [tarihiKayitlar, setTarihiKayitlar] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const yatirimTarihiKayitGetir = async () => {
    const response = await axios.get(`${BASE_URL}tarihi-yatirim-sorgula`);
    setTarihiKayitlar(response.data);
  };

  const yatirimKalemiEkle = async (i) => {
    await axios
      .post(`${BASE_URL}yatirim-islem`, i)
      .then((response) => {
        setMessage(response.data.message);
        setResponseStatus(response.status);
        console.log(response.status);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <YatirimContext.Provider
      value={{
        tarihiKayitlar,
        message,
        setMessage,
        error,
        setError,
        responseStatus,
        yatirimKalemiEkle,
        startDate,
      }}
    >
      {children}
    </YatirimContext.Provider>
  );
};

export const useYatirimContext = () => {
  return useContext(YatirimContext);
};
