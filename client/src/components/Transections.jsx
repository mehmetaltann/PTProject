import { Stack, Box } from "@mui/material";
import { useEffect } from "react";
import PageTitle from "./UI/PageTitle";

const Transections = ({
  title,
  FormComponent,
  SonIslemComponent,
  error,
  setError,
  message,
  setMessage,
  data,
  setSelectedDate,
}) => {
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
        <PageTitle title={title} />
        <FormComponent />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <SonIslemComponent data={data} setSelectedDate={setSelectedDate} />
    </Stack>
  );
};

export default Transections;
