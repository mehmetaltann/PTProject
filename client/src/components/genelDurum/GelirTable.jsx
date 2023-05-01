import { butceCategoryData } from "../../utils/localData";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const GelirTable = () => {
  const { toplamCategorikButceData, activeCategory, setActiveCategory } =
    useGlobalContext();
  return (
    <GelirTableStyled>
      <h3>Gelirler</h3>
      {butceCategoryData
        .filter((cat) => cat.type === "Gelir")
        /*.filter((cata) => cata.categoryA !== "Tümü")*/
        .map(({ id, categoryA }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(categoryA)}
            className={activeCategory === categoryA ? "gelir active" : "gelir"}
          >
            <p>{categoryA}&nbsp;:</p>{" "}
            <span>{toplamCategorikButceData(categoryA, "gelir")}</span>
          </button>
        ))}
    </GelirTableStyled>
  );
};

const GelirTableStyled = styled.div`
  width: 30%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    width: 45%;
  }

  @media only screen and (max-width: 600px) {
    flex-basis: 100%;
  }

  .gelir {
    background: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;

    :hover {
      background: var(--theme-fourth);
      color: var(--theme-secondary);
    }

    p {
      font-weight: 600;
      opacity: 0.7;
    }

    span {
      color: var(--theme-green);
      text-align: center;
    }
  }
  .active {
    background: var(--theme-fourth);
    color: var(--theme-secondary);
    font-weight: 600;
    opacity: 1;
    font-size: 1rem;
  }
`;

export default GelirTable;
