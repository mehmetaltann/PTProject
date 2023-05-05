import { Stack } from "@mui/material";
import PageTitle from "../components/UI/PageTitle";
import BIform from "../components/butceIslemleri/BIform";
import BIsonIslemler from "../components/butceIslemleri/BIsonIslemler";

const ButceGiris = () => {
  return (
    <Stack spacing={2}>
      <Stack spacing={{ sm: 4}} direction={{ sm: "row", xs: "column" }}>
        <PageTitle title="Bütçe Kayıt" />
        <BIform />
      </Stack>
      <BIsonIslemler />
    </Stack>
  );
};

export default ButceGiris;
