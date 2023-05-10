import PageTitle from "../UI/PageTitle";
import YGsonIslemler from "./table/YGsonIslemler";
import { useYGContext } from "./store/ygContext";
import { Stack, Box } from "@mui/material";
import { useEffect } from "react";

const YGmain = () => {
  const { error, message, setError, setMessage } = useYGContext();

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
        <PageTitle title="Geçmiş Yatırım İşlemleri" />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <YGsonIslemler />
    </Stack>
  );
};

export default YGmain;
