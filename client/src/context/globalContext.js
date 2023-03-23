import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [butceData, setButceData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [activeTarih, setActiveTarih] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeType, setActiveType] = useState("gelir");
  const capitalizedTitle =
    activeType.charAt(0).toUpperCase() + activeType.slice(1);

  const butceKalemiGetir = async () => {
    const response = await axios.get(
      `${BASE_URL}butce-getir/${activeTarih}/Tümü`
    );
    setButceData(response.data);
  };

  const butceKalemiEkle = async (data, type) => {
    await axios
      .post(`${BASE_URL}butce-veri-ekle/${type}`, data)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    butceKalemiGetir();
  };

  const butceKalemiSil = async (id) => {
    await axios
      .delete(`${BASE_URL}butce-veri-sil/${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    butceKalemiGetir();
  };

  const toplamButceData = (type) => {
    let total = 0;
    const data = butceData.filter((data) => data.type === type);
    data.forEach((dataType) => (total += dataType.amount));
    return total.toFixed(2);
  };

  const toplamCategorikButceData = (categoryData = "Tümü", type) => {
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
        return toplamButceData(type);
      case 2:
        return (toplamButceData(type) / 3).toFixed(2);
      case 3:
        return (toplamButceData(type) / 6).toFixed(2);
      case 4:
        return (toplamButceData(type) / 12).toFixed(2);
      case 5:
        return (toplamButceData(type) / 36).toFixed(2);
      default:
        return toplamButceData(type);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        capitalizedTitle,
        butceData,
        butceKalemiGetir,
        butceKalemiEkle,
        butceKalemiSil,
        toplamButceData,
        toplamCategorikButceData,
        ortalamaButceData,
        error,
        setError,
        message,
        setMessage,
        startDate,
        setStartDate,
        activeTarih,
        setActiveTarih,
        activeCategory,
        setActiveCategory,
        activeType,
        setActiveType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
