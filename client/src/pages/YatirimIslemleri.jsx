import { useYatirimContext } from "../context/yatirimContext";
import { Fragment, useEffect } from "react";
import { Stack } from "@mui/material";
import YIform from "../components/yatirimIslemleri/YIform";
import YIsonIslemler from "../components/yatirimIslemleri/YIsonIslemler";
import PageTitle from "../components/UI/PageTitle";

const YatirimIslemleri = () => {
  const { yatirimIslemleriSorgula, portfoySorgula } = useYatirimContext();

  useEffect(() => {
    yatirimIslemleriSorgula();
    portfoySorgula();
  }, []);

  return (
    <Fragment>
      <PageTitle title="Yatırım İşlemleri" />
      <Stack spacing={1}>
        <YIform />
        <YIsonIslemler />
      </Stack>
    </Fragment>
  );
};

export default YatirimIslemleri;
