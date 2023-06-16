import PageConnectionWait from "../../UI/PageConnectionWait";
import AltanSelect from "../../UI/AltanSelect";
import { useSelector } from "react-redux";
import { pickDate, pickPortfolio } from "../../../redux/slices/generalSlice";
import { useGetPortfoliosQuery } from "../../../redux/apis/portfolioApi";
import { Stack } from "@mui/material";

export const historyPick = [
  { value: 1, label: "Son 1 Ay" },
  { value: 2, label: "Son 3 Ay" },
  { value: 3, label: "Son 6 Ay" },
  { value: 4, label: "Son 1 Yıl" },
  { value: 5, label: "Son 3 Yıl" },
  { value: 0, label: "Tümü" },
];

const TableFilters = () => {
  const { selectedDate, selectedPortfolio } = useSelector(
    (state) => state.general
  );
  const { data: portfolios, isLoading, isFetching } = useGetPortfoliosQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!portfolios)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  return (
    <Stack direction="row" spacing={1} alignItems={"center"}>
      <AltanSelect
        id="tarih"
        defaultValue={2}
        value={selectedDate}
        minWidth="20ch"
        onChange={pickDate}
        data={historyPick}
        dataTextAttr="label"
        dataValueAttr="value"
      />
      <AltanSelect
        id="portfoy"
        defaultValue="Tümü"
        value={selectedPortfolio}
        minWidth="15ch"
        onChange={pickPortfolio}
        data={portfolios}
        dataTextAttr="title"
        dataValueAttr="title"
        isAll={true}
      />
    </Stack>
  );
};

export default TableFilters;
