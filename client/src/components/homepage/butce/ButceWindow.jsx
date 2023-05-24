import ButceItem from "./ButceItem";
import { Paper, Divider } from "@mui/material";
import { thisMonth, thisYear } from "../../../utils/help-functions";
import { aylar } from "../../../utils/localData";

const ButceWindow = () => {
  const thisAyYil = `${
    aylar.find((item) => item.value === thisMonth).label
  } - ${thisYear}`;

  return (
    <Paper>
      <ButceItem
        title={"Bütçe"}
        value={thisAyYil}
        sx={{
          color: "info.main",
        }}
        typVar="h6"
      />
      <Divider />
      <ButceItem title={"Önceki Aydan Devir"} value={"- 2850 TL - "} />
      <Divider variant="inset" />
      <ButceItem
        title={"Gelir"}
        value={"..... 2850 TL"}
        typColor="success.main"
      />
      <Divider variant="inset" />
      <ButceItem
        title={"Gider"}
        value={"..... 2850 TL"}
        typColor="error.main"
      />
      <Divider variant="inset" />
      <ButceItem title={"Banka"} value={"- 2850 TL -"} />
      <Divider />
      <ButceItem title={"Yatırım"} value={"- 2850 TL - "} />
      <Divider />
      <ButceItem
        sx={{
          color: "info.main",
        }}
        title={"Toplam Varlık"}
        value={"2850 TL"}
        typVar="h6"
      />
    </Paper>
  );
};

export default ButceWindow;
