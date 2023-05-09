import { useYatirimContext } from "../context/yatirimContext";
import { useEffect, useState } from "react";
import YIform from "../components/yatirimIslemleri/YIform";
import YIsonIslemler from "../components/yatirimIslemleri/YIsonIslemler";
import useHttp from "../hooks/use-http";
import Transections from "../components/Transections";

const YatirimIslemleri = () => {
  const {
    message,
    setMessage,
    error,
    setError,
    yatirimKalemiSil,
    yatirimKalemiEkle,
  } = useYatirimContext();

  const [selectedDate, setSelectedDate] = useState(2);
  const [selectedPortfoy, setSelectedPortfoy] = useState(
    "Bireysel Emeklilik Fonları"
  );
  const [portfoyler, setPortfoyler] = useState([]);
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
        url: `yatirim-islem-sorgula/${selectedDate}`,
      },
      transformData
    );
  }, [selectedDate, sendRequest, yatirimKalemiSil, yatirimKalemiEkle]);

  useEffect(() => {
    const transformData = (fetchData) => {
      setPortfoyler(fetchData);
    };

    sendRequest(
      {
        method: "get",
        url: `portfoy-sorgula`,
      },
      transformData
    );
  }, []);

  return (
    <Transections
      title="Yatırım İşlemi"
      FormComponent={YIform}
      SonIslemComponent={YIsonIslemler}
      data={data}
      setSelectedDate={setSelectedDate}
      error={error}
      setError={setError}
      message={message}
      setMessage={setMessage}
      portfoyler={portfoyler}
      selectedPortfoy={selectedPortfoy}
      setSelectedPortfoy={setSelectedPortfoy}
    />
  );
};

export default YatirimIslemleri;
