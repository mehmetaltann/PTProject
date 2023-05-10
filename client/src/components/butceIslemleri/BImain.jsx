import PageTitle from "../UI/PageTitle";
import BIform from "./form/BIform";
import BIsonIslemler from "./table/BIsonIslemler";
import { useEffect } from "react";
import { useButceContext } from "./store/butceContext";
import { Stack, Box } from "@mui/material";

const BImain = () => {
  const { error, message, setError, setMessage } = useButceContext();

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
        <PageTitle title="Bütçe İşlemleri" />
        <BIform />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <BIsonIslemler />
    </Stack>
  );
};

export default BImain;
