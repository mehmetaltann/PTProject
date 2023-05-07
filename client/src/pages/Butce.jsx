import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import BIform from "../components/butceIslemleri/BIform";
import BIsonIslemler from "../components/butceIslemleri/BIsonIslemler";
import useHttp from "../hooks/use-http";
import Transections from "../components/Transections";

const ButceGiris = () => {
  const {
    butceKalemiSil,
    butceKalemEkle,
    message,
    setMessage,
    error,
    setError,
  } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(2);
  const [data, setData] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
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
  }, [selectedDate, sendRequest, butceKalemiSil, butceKalemEkle]);

  return (
    <Transections
      title="Bütçe Kayıt"
      FormComponent={BIform}
      SonIslemComponent={BIsonIslemler}
      data={data}
      setSelectedDate={setSelectedDate}
      error={error}
      setError={setError}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default ButceGiris;
