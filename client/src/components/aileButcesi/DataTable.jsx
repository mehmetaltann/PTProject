import React, { Fragment } from "react";
import DataTableItem from "./DataTableItem";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect } from "react";

const DataTable = () => {
  const { butceData, activeType, activeCategory, setActiveCategory } =
    useGlobalContext();

  useEffect(() => {
    setActiveCategory("Tümü");
  }, [activeType]);

  const data =
    activeCategory === "Tümü"
      ? butceData.filter((data) => data.type === activeType)
      : butceData
          .filter((data) => data.type === activeType)
          .filter(
            (dataCat) =>
              dataCat.categoryA === activeCategory ||
              dataCat.categoryB === activeCategory
          );

  return (
    <Fragment>
      {data.map(
        ({ _id, title, amount, date, categoryA, categoryB, description }) => (
          <DataTableItem
            key={_id}
            id={_id}
            title={title}
            amount={amount}
            date={date}
            categoryA={categoryA}
            categoryB={categoryB}
            description={description}
            activeType={activeType}
          />
        )
      )}
    </Fragment>
  );
};

export default DataTable;
