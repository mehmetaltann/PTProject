import { useYatirimContext } from "../context/yatirimContext";
import { useEffect, useState } from "react";
import YIform from "../components/yatirimIslemleri/YIform";
import YIsonIslemler from "../components/yatirimIslemleri/YIsonIslemler";
import useHttp from "../hooks/use-http";
import Transections from "../components/Transections";

const YatirimIslemleri = () => {
  const { message, setMessage, error, setError } = useYatirimContext();
  const [selectedDate, setSelectedDate] = useState(2);
  const [data, setData] = useState([]);

  const { sendRequest } = useHttp();

  useEffect(() => {}, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

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
    />
  );
};

export default YatirimIslemleri;
