import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [gelirler, setGelirler] = useState([]);
  const [giderler, setGiderler] = useState([]);
  const [error, setError] = useState(null);

  const gelirEkle = async (income) => {
    const response = await axios
      .post(`${BASE_URL}gelir-ekle`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <GlobalContext.Provider value={{ gelirEkle }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
