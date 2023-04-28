import { useYatirimContext } from "../../context/yatirimContext";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import YGdataTable from "./YGdataTable";

const YGmain = () => {
  const { yatirimGecmisIslemSorgula, gecmisIslemler } = useYatirimContext();

  useEffect(() => {
    yatirimGecmisIslemSorgula();
  }, []);

  return (
    <Container sx={{ height: "100%", width: "100%" }} fixed>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 2, mb: 3 }}
      >
        Geçmiş Kayıtlar
      </Typography>
      <YGdataTable />
    </Container>
  );
};

export default YGmain;
