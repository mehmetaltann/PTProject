import styled from "styled-components";
import Button from "../UI/Button";
import { useGlobalContext } from "../../context/globalContext";
import { butceCategoryData } from "../../utils/localData";
import { search } from "../../utils/icons";

const TableTitle = () => {
  const {
    toplamButceData,
    activeType,
    capitalizedTitle,
    setActiveCategory,
  } = useGlobalContext();

  return (
    <TableTitleStyled indicatorColor={activeType === "gelir" ? "green" : "red"}>
      <h3>
        {`Toplam ${capitalizedTitle}:`}{" "}
        <span> {toplamButceData(activeType)} TL</span>
      </h3>
      <div className="input-grup">
        <label htmlFor="category">Kategory Seçiniz:</label>

        {activeType === "gelir" ? (
          <select
            required
            name="category"
            id="category"
            onChange={(e) => {
              setActiveCategory(e.target.value);
            }}
          >
            {butceCategoryData
              .filter((cat) => cat.type === "Gelir")
              .map(({ id, categoryA }) => (
                <option key={id} value={categoryA}>
                  {categoryA}
                </option>
              ))}
          </select>
        ) : (
          <select
            required
            name="categoryB"
            id="categoryB"
            onChange={(e) => {
              setActiveCategory(e.target.value);
            }}
          >
            {butceCategoryData
              .filter((cat) => cat.type === "Gider")
              .map(({ id, categoryB }) => (
                <option key={id} value={categoryB}>
                  {categoryB}
                </option>
              ))}
          </select>
        )}
        <Button
          background={"var(--theme-primary)"}
          color={"var(--theme-fourth)"}
          name={`Tümü`}
          icon={search}
          bpadding={".4rem .8rem"}
          bradious={"35px"}
          onClick={() => {
            setActiveCategory("Tümü");
          }}
        ></Button>
      </div>
    </TableTitleStyled>
  );
};

const TableTitleStyled = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

h3 {
    margin-bottom: 1rem;
    opacity: 0.7;

    span {
      color: ${(props) => props.indicatorColor};
    }
  }

  .input-grup {
    width: 45%;
    display: flex;
    align-items: center;
    gap: .4rem;
    font-size:ont-size: 1.2rem;
    font-family: inherit;

    label {
      width: 30%;
      opacity: 0.8rem;
    }

    select {
      flex: 1;
      font-size: inherit;
      font-family: inherit;
      outline: none;
      border: none;
      padding: 0.3rem 0.8rem;
      border-radius: 10px;
      resize: none;
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      color: var(--theme-fourth);
      opacity: 0.8;
    }
  }
`;

export default TableTitle;
