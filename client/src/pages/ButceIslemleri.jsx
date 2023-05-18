import PageTitle from "../components/UI/PageTitle";
import BIform from "../components/butceIslemleri/form/BIform";
import BIsonIslemler from "../components/butceIslemleri/table/BIsonIslemler";
import { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/butcesSlice";

const ButceIslemleri = () => {
  const { message } = useSelector((state) => state.butce);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message]);

  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Bütçe İşlemleri" />
        <BIform />
      </Stack>
      {message && <Box>{message.message}</Box>}
      <BIsonIslemler />
    </Stack>
  );
};

export default ButceIslemleri;
