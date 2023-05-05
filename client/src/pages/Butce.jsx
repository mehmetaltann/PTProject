import { Stack, Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../context/globalContext";
import PageTitle from "../components/UI/PageTitle";
import BIform from "../components/butceIslemleri/BIform";
import BIsonIslemler from "../components/butceIslemleri/BIsonIslemler";
import useHttp from "../hooks/use-http";

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

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Bütçe Kayıt" />
        <BIform />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <BIsonIslemler data={data} setSelectedDate={setSelectedDate} />
    </Stack>
  );
};

export default ButceGiris;
