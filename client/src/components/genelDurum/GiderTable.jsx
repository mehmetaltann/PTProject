import { butceCategoryData } from "../../utils/localData";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const GiderTable = () => {
  const { toplamCategorikButceData, activeCategory, setActiveCategory } =
    useGlobalContext();
  return (
    <GiderTableStyled>
      <h3>Giderler</h3>
      <div className="gider-con">
        {butceCategoryData
          .filter((cat) => cat.type === "Gider")
          /*.filter((cata) => cata.categoryB !== "Tümü")*/
          .map(({ id, categoryB }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(categoryB)}
              className={
                activeCategory === categoryB ? "gider active" : "gider"
              }
            >
              <p>{categoryB}&nbsp;:</p>{" "}
              <span>{toplamCategorikButceData(categoryB, "gider")}</span>
            </button>
          ))}
      </div>
    </GiderTableStyled>
  );
};

const GiderTableStyled = styled.div`
  flex: 1;
  overflow: auto;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 1.4rem;
  }

  @media only screen and (max-width: 600px) {
    flex: 0 98%;
  }

  .gider-con {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.6rem;

    .gider {
      width: 48%;
      background: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      padding: 1rem;
      border-radius: 20px;
      display: flex;
      gap: 0.3rem;
      font-size: 0.9rem;
      flex-wrap: wrap;

      @media only screen and (max-width: 800px) {
        width: 98%;
      }

      :hover {
        background: var(--theme-fourth);
        color: var(--theme-secondary);
      }

      p {
        font-weight: 600;
        opacity: 0.7;
      }

      span {
        color: var(--theme-red);
      }
    }

    .active {
      background: var(--theme-fourth);
      color: var(--theme-secondary);
      font-weight: 600;
      opacity: 1;
      font-size: 1rem;
    }
  }
`;

export default GiderTable;
