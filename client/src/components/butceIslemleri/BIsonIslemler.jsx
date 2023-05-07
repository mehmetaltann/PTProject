import BIdataTable from "./BIdataTable";
import DataTableWrapper from "../DataTableWrapper";

const BIsonIslemler = ({ data, setSelectedDate }) => {
  return (
    <DataTableWrapper
      DataTableComponent={BIdataTable}
      data={data}
      setSelectedDate={setSelectedDate}
    />
  );
};

export default BIsonIslemler;
