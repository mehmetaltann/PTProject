import { useYatirimContext } from "../../context/yatirimContext";
import { useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import YIform from "./YIform";
import YIsonIslemler from "./YIsonIslemler";

const YImain = () => {
  const { yatirimIslemleriSorgula, portfoySorgula } = useYatirimContext();

  useEffect(() => {
    yatirimIslemleriSorgula();
    portfoySorgula();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 1, mb: 1 }}>
        Yatırım İşlemleri
      </Typography>
      <Stack spacing={2}>
        <YIform />
        <YIsonIslemler />
      </Stack>
    </Container>
  );
};

export default YImain;
