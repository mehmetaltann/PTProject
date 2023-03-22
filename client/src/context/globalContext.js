import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [butceData, setButceData] = useState([]);
  const [gelirler, setGelirler] = useState([]);
  const [giderler, setGiderler] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [activeTarih, setActiveTarih] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const butceKalemiGetir = async () => {
    const response = await axios.get(`${BASE_URL}butce-getir/0/Tümü`);
    setButceData(response.data);
  };

  const butceKalemiEkle = async (data, type) => {
    const response = await axios
      .post(`${BASE_URL}butce-veri-ekle/${type}`, data)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    butceKalemiGetir();
  };

  const butceKalemiSil = async (id) => {
    const response = await axios
      .delete(`${BASE_URL}butce-veri-sil/${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    butceKalemiGetir();
  };

  const toplamButceData = (categoryData = "Tümü", type) => {
    let total = 0;
    const data = butceData.filter((data) => data.type === type);
    if (categoryData === "Tümü") {
      data.forEach((dataType) => {
        total += dataType.amount;
      });
    } else {
      data
        .filter(
          (cat) =>
            cat.categoryA === categoryData || cat.categoryB === categoryData
        )
        .forEach((dataType) => {
          total += dataType.amount;
        });
    }
    return total.toFixed(2);
  };

  const ortalamaButceData = (type) => {
    switch (activeTarih) {
      case 1:
        return toplamButceData(undefined, type);
        break;
      case 2:
        return (toplamButceData(undefined, type) / 3).toFixed(2);
        break;
      case 3:
        return (toplamButceData(undefined, type) / 6).toFixed(2);
        break;
      case 4:
        return (toplamButceData(undefined, type) / 12).toFixed(2);
        break;
      case 5:
        return (toplamButceData(undefined, type) / 36).toFixed(2);
        break;
      default:
        return toplamButceData(undefined, type);
        break;
    }
  };

  const toplamGelir = (categoryData = "Tümü") => {
    let totalIncome = 0;
    if (categoryData === "Tümü") {
      gelirler.forEach((gelir) => {
        totalIncome += gelir.amount;
      });
    } else {
      gelirler
        .filter((cat) => cat.category === categoryData)
        .forEach((gelir) => {
          totalIncome += gelir.amount;
        });
    }

    return totalIncome.toFixed(2);
  };

  const gelirGetir = async () => {
    const response = await axios.get(
      `${BASE_URL}gelir-getir/${activeTarih}/${activeCategory}`
    );
    setGelirler(response.data);
  };

  const giderGetir = async () => {
    const response = await axios.get(
      `${BASE_URL}gider-getir/${activeTarih}/${activeCategory}`
    );
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

  const toplamGider = (categoryData = "Tümü") => {
    let totalExpense = 0;
    if (categoryData === "Tümü") {
      giderler.forEach((gider) => {
        totalExpense += gider.amount;
      });
    } else {
      giderler
        .filter((cat) => cat.categoryB === categoryData)
        .forEach((gider) => {
          totalExpense += gider.amount;
        });
    }
    return totalExpense.toFixed(2);
  };

  const ortalamaGelir = () => {
    switch (activeTarih) {
      case 1:
        return toplamGelir();
        break;
      case 2:
        return (toplamGelir() / 3).toFixed(2);
        break;
      case 3:
        return (toplamGelir() / 6).toFixed(2);
        break;
      case 4:
        return (toplamGelir() / 12).toFixed(2);
        break;
      case 5:
        return (toplamGelir() / 36).toFixed(2);
        break;
      default:
        return toplamGelir();
        break;
    }
  };

  const ortalamaGider = () => {
    switch (activeTarih) {
      case 1:
        return toplamGider();
        break;
      case 2:
        return (toplamGider() / 3).toFixed(2);
        break;
      case 3:
        return (toplamGider() / 6).toFixed(2);
        break;
      case 4:
        return (toplamGider() / 12).toFixed(2);
        break;
      case 5:
        return (toplamGider() / 36).toFixed(2);
        break;
      default:
        return toplamGider();
        break;
    }
  };

  const totalBalance = () => {
    return (toplamGelir() - toplamGider()).toFixed(2);
  };

  return (
    <GlobalContext.Provider
      value={{
        butceData,
        butceKalemiGetir,
        butceKalemiEkle,
        butceKalemiSil,
        toplamButceData,
        ortalamaButceData,
        gelirEkle,
        gelirGetir,
        gelirSil,
        gelirler,
        giderEkle,
        giderGetir,
        giderler,
        giderSil,
        toplamGelir,
        toplamGider,
        setGiderler,
        totalBalance,
        ortalamaGelir,
        ortalamaGider,
        error,
        setError,
        message,
        setMessage,
        startDate,
        setStartDate,
        activeTarih,
        setActiveTarih,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
