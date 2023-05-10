import PageTitle from "../UI/PageTitle";
import YIform from "./form/YIform";
import YIsonIslemler from "./table/YIsonIslemler";
import useHttp from "../../hooks/use-http";
import { Stack, Box } from "@mui/material";
import { useEffect } from "react";
import { useYatirimContext } from "./store/yatirimContext";

const YImain = () => {
  const { error, message, setError, setMessage, setPortfoyler } =
    useYatirimContext();
  const { sendRequest } = useHttp();

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

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1000);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1000);
    }
  }, [error, message]);

  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Yatırım İşlemleri" />
        <YIform />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <YIsonIslemler />
    </Stack>
  );
};

export default YImain;
