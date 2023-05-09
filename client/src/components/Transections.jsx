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
  selectedPortfoy,
  setSelectedPortfoy,
  portfoyler,
}) => {
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
        <PageTitle title={title} />
        <FormComponent
          portfoyler={portfoyler}
          selectedPortfoy={selectedPortfoy}
          setSelectedPortfoy={setSelectedPortfoy}
        />
      </Stack>
      {message && <Box>{message}</Box>}
      {error && <Box>{error}</Box>}
      <SonIslemComponent
        portfoyler={portfoyler}
        data={data}
        selectedPortfoy={selectedPortfoy}
        setSelectedDate={setSelectedDate}
        setSelectedPortfoy={setSelectedPortfoy}
      />
    </Stack>
  );
};

export default Transections;
