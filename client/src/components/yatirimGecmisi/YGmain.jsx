import PageTitle from "../UI/PageTitle";
import YGsonIslemler from "./table/YGsonIslemler";
import { Stack, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/historiesSlice";

const YGmain = () => {
  const { message } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message]);

  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Geçmiş Yatırım İşlemleri" />
      </Stack>
      {message && <Box>{message}</Box>}
      <YGsonIslemler />
    </Stack>
  );
};

export default YGmain;
