import PageTitle from "../components/UI/PageTitle";
import YIform from "../components/yatirimIslemleri/form/YIform";
import YIsonIslemler from "../components/yatirimIslemleri/table/YIsonIslemler";
import { Stack, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/yatirimSlice";

const YatirimIslemleri = () => {
  const { message } = useSelector((state) => state.yatirim);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message]);

  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Yatırım İşlemleri" />
        <YIform />
      </Stack>
      {message && <Box>{message.message}</Box>}
      <YIsonIslemler />
    </Stack>
  );
};

export default YatirimIslemleri;
