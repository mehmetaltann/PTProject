import PageTitle from "../components/UI/PageTitle";
import YGsonIslemler from "../components/yatirimGecmisi/table/YGsonIslemler";
import { Stack, Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/historiesSlice";

const YatirimGecmisi = () => {
  const { message } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message, dispatch]);

  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Geçmiş Yatırım İşlemleri" />
          </Stack>
          {message && <Box>{message.message}</Box>}
          <YGsonIslemler />
        </Stack>
      </Container>
    </Box>
  );
};

export default YatirimGecmisi;
