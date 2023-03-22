import { butceCategoryData } from "../../utils/localData";
import styled from "styled-components";

const GiderTable = ({ toplamButceData }) => {
  return (
    <GiderTableStyled>
      <h3>Giderler</h3>
      <div className="gider-con">
        {butceCategoryData
          .filter((cat) => cat.type === "Gider")
          .map(({ id, categoryB }) => (
            <div className="gider" key={id}>
              <p>{categoryB}&nbsp;:</p>{" "}
              <span>
                {toplamButceData(categoryB,"gider")} TL
              </span>
            </div>
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
    margin-bottom: 1rem;
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

      :hover {
        background: var(--theme-fourth);
        color: var(--theme-secondary);
      }

      p {
        font-weight: 600;
        opacity: 0.7;

        @media only screen and (max-width: 850px) {
          text-align: center;
        }
      }

      span {
        color: var(--theme-red);
        text-align: center;
      }

      @media only screen and (max-width: 850px) {
        width: 90%;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
      }
    }
  }
`;

export default GiderTable;
