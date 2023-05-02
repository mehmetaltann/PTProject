import { Fragment } from "react";
import { Stack } from "@mui/material";
import PageTitle from "../components/UI/PageTitle";
import BIform from "../components/butceIslemleri/BIform";
import BIsonIslemler from "../components/butceIslemleri/BIsonIslemler";

const ButceGiris = () => {
  return (
    <Fragment>
      <PageTitle title="Bütçe Kayıt" />
      <Stack spacing={1}>
        <BIform />
        <BIsonIslemler />
      </Stack>
    </Fragment>
  );
};

export default ButceGiris;
