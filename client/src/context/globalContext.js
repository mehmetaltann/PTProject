import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [gelirler, setGelirler] = useState([]);
  const [giderler, setGiderler] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const gelirGetir = async () => {
    const response = await axios.get(`${BASE_URL}gelir-getir`);
    setGelirler(response.data);
  };

  const giderGetir = async () => {
    const response = await axios.get(`${BASE_URL}gider-getir`);
    setGiderler(response.data);
  };

  const gelirEkle = async (income) => {
    const response = await axios
      .post(`${BASE_URL}gelir-ekle`, income)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    gelirGetir();
  };

  const giderEkle = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}gider-ekle`, expense)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    giderGetir();
  };

  const gelirSil = async (id) => {
    const response = await axios
      .delete(`${BASE_URL}gelir-sil/${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    gelirGetir();
  };

  const giderSil = async (id) => {
    const response = await axios
      .delete(`${BASE_URL}/gider-sil/${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    giderGetir();
  };

  const toplamGelir = () => {
    let totalIncome = 0;
    gelirler.forEach((gelir) => {
      totalIncome += gelir.amount;
    });
    return totalIncome.toFixed(2);
  };

  const toplamGider = () => {
    let totalExpense = 0;
    giderler.forEach((gider) => {
      totalExpense += gider.amount;
    });
    return totalExpense.toFixed(2);
  };

  const totalBalance = () => {
    return toplamGelir() - toplamGider();
  };

  const islemGecmisi = () => {
    const history = [...gelirler, ...giderler];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 5);
  };

  return (
    <GlobalContext.Provider
      value={{
        gelirEkle,
        gelirGetir,
        gelirler,
        gelirSil,
        toplamGelir,
        giderEkle,
        giderGetir,
        giderler,
        giderSil,
        toplamGider,
        setGiderler,
        totalBalance,
        islemGecmisi,
        error,
        setError,
        message,
        setMessage,
        startDate,
        setStartDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
