import { butceCategoryData } from "../../utils/localData";
import styled from "styled-components";

const GelirTable = ({ toplamCategorikButceData }) => {
  return (
    <GelirTableStyled>
      <h3>Gelirler</h3>
      {butceCategoryData
        .filter((cat) => cat.type === "Gelir")
        .filter((cata) => cata.categoryA !== "Tümü")
        .map(({ id, categoryA }) => (
          <div className="gelir" key={id}>
            <p>{categoryA}&nbsp;:</p>{" "}
            <span>{toplamCategorikButceData(categoryA, "gelir")} TL</span>
          </div>
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

  @media only screen and (max-width: 600px) {
    width: 100%;

    h3 {
      text-align: center;
    }
  }

  .gelir {
    background: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    gap: 0.3rem;

    @media only screen and (max-width: 850px) {
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
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
      color: var(--theme-green);
      text-align: center;
    }
  }
`;

export default GelirTable;
