import styled from "styled-components";
import Button from "../UI/Button";
import { useGlobalContext } from "../../context/globalContext";
import { butceCategoryData } from "../../utils/localData";
import { search } from "../../utils/icons";

const TableTitle = () => {
  const { toplamButceData, activeType, capitalizedTitle, setActiveCategory } =
    useGlobalContext();

  return (
    <TableTitleStyled indicatorColor={activeType === "gelir" ? "green" : "red"}>
      <div className="toplam-tutar">
        <h3>
          {`Toplam ${capitalizedTitle}:`}{" "}
          <span> {toplamButceData(activeType)} TL</span>
        </h3>
      </div>
      <div className="category-pick">
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
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 950px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  .toplam-tutar {
    width: 40%;
    opacity: 0.7;

    span {
      color: ${(props) => props.indicatorColor};
    }

    @media only screen and (max-width: 1200px) {
      width: 100%;
      font-size: 1rem;
    }
  }

  .category-pick {
    flex: 1;
    gap: 0.4rem;
    font-size: 1.2rem;
    font-family: inherit;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 1100px) {
      font-size: 1rem;
    }

    label {
      width: 25%;
      opacity: 0.8rem;

      @media only screen and (max-width: 1400px) {
        width: 30%;
      }

      @media only screen and (max-width: 1400px) {
        font-size: 1rem;
      }

      @media only screen and (max-width: 1000px) {
        font-size: 1.2rem;
      }
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

    button {
      width: 20%;

      i {
        @media only screen and (max-width: 1200px) {
          width: 0.5rem;
        }
      }

      @media only screen and (max-width: 1200px) {
        font-size: 1rem;
      }
    }
  }
`;

export default TableTitle;
