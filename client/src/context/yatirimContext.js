import { createContext, useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1623/api/v1/";

export const YatirimContext = createContext();

export const YatirimProvider = ({ children }) => {
  const [tarihiKayitlar, setTarihiKayitlar] = useState([]);
  const [islemler, setIslemler] = useState([]);
  const [portfoyler, setPortfoyler] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedPortfoy, setSelectedPortfoy] = useState("Bireysel Emeklilik");

  const yatirimIslemleriSorgula = async () => {
    const { data } = await axios.get(`${BASE_URL}yatirim-islem-sorgula`);
    setIslemler(data);
  };

  const yatirimIslemiEkle = async (islemler) => {
    let axiosArray = [];
    for (let islem of islemler) {
      let newPromise = axios({
        method: "post",
        url: `${BASE_URL}yatirim-islem`,
        data: islem,
      });
      axiosArray.push(newPromise);
    }

    await axios
      .all(axiosArray)
      .then(
        axios.spread((...responses) => {
          responses.forEach((res) =>
            setMessageList([...messageList, res.data.message])
          );
        })
      )
      .catch((error) => {});

    yatirimIslemleriSorgula();
  };

  const yatirimIslemiSil = async (id) => {
    await axios
      .delete(`${BASE_URL}yatirim-islem-sil/${id}`)
      .then((response) => setMessage(response.data.message))
      .catch((err) => {
        setError(err.response.data.message);
      });
    yatirimIslemleriSorgula();
  };

  const portfoySorgula = async () => {
    const { data } = await axios.get(`${BASE_URL}portfoy-sorgula`);
    setPortfoyler(data);
  };

  /*
  const yatirimKalemiEkle = async (islem) => {
    try {
      const { data } = await axios.post(`${BASE_URL}yatirim-islem`, islem);
      setMessage(data.message)
      //setMessageList((old) => [...old, data.message]);
    } catch (err) {
      setError(err.data.message)
    }
    yatirimIslemleriSorgula();
  };
  */

  const yatirimTarihiKayitGetir = async () => {
    const response = await axios.get(`${BASE_URL}gecmis-islem-sorgula`);
    setTarihiKayitlar(response.data);
  };

  return (
    <YatirimContext.Provider
      value={{
        yatirimIslemleriSorgula,
        islemler,
        yatirimIslemiEkle,
        yatirimIslemiSil,
        tarihiKayitlar,
        portfoySorgula,
        portfoyler,
        setPortfoyler,
        message,
        setMessage,
        error,
        setError,
        startDate,
        selectedPortfoy,
        setSelectedPortfoy,
      }}
    >
      {children}
    </YatirimContext.Provider>
  );
};

export const useYatirimContext = () => {
  return useContext(YatirimContext);
};
