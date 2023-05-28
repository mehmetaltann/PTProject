import BudgetItem from "./BudgetItem";
import { Paper, Divider } from "@mui/material";
import { thisMonth, thisYear } from "../../../utils/help-functions";
import { aylar } from "../../../utils/localData";

const BudgetWindow = () => {
  const thisAyYil = `${
    aylar.find((item) => item.value === thisMonth).label
  } - ${thisYear}`;

  return (
    <Paper>
      <BudgetItem
        title={"Bütçe"}
        value={thisAyYil}
        sx={{
          color: "info.main",
        }}
        typVar="h6"
      />
      <Divider />
      <BudgetItem title={"Önceki Aydan Devir"} value={"- 2850 TL - "} />
      <Divider variant="inset" />
      <BudgetItem
        title={"Gelir"}
        value={"..... 2850 TL"}
        typColor="success.main"
      />
      <Divider variant="inset" />
      <BudgetItem
        title={"Gider"}
        value={"..... 2850 TL"}
        typColor="error.main"
      />
      <Divider variant="inset" />
      <BudgetItem title={"Banka"} value={"- 2850 TL -"} />
      <Divider />
      <BudgetItem title={"Yatırım"} value={"- 2850 TL - "} />
      <Divider />
      <BudgetItem
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

export default BudgetWindow;
