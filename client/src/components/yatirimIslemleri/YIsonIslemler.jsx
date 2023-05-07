import YIdataTable from "./YIdataTable";
import DataTableWrapper from "../DataTableWrapper";

const YIsonIslemler = ({ data, setSelectedDate }) => {
  return (
    <DataTableWrapper
      DataTableComponent={YIdataTable}
      data={data}
      setSelectedDate={setSelectedDate}
    />
  );
};

export default YIsonIslemler;
