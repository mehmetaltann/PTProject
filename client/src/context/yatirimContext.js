import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const YatirimContext = createContext();

export const YatirimProvider = ({ children }) => {
  const [tarihiKayitlar, setTarihiKayitlar] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const yatirimTarihiKayitGetir = async () => {
    const response = await axios.get(`${BASE_URL}tarihi-yatirim-sorgula`);
    setTarihiKayitlar(response.data);
  };

  const yatirimKalemiEkle = async (data, type) => {
    await axios
      .post(`${BASE_URL}yatirim-islem`, data)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    //butceKalemiGetir();
  };

  return (
    <YatirimContext.Provider
      value={{ tarihiKayitlar, message, setMessage, error, setError }}
    >
      {children}
    </YatirimContext.Provider>
  );
};

export const useYatirimContext = () => {
  return useContext(YatirimContext);
};
