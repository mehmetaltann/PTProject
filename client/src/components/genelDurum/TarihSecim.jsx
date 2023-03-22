import styled from "styled-components";
import { tarihSecim } from "../../utils/localData";

const TarihSecim = ({ activeTarih, setActiveTarih }) => {
  return (
    <TarihSecimStyled className="tarihSecim-container">
      {tarihSecim.map(({ id, title }) => (
        <button
          onClick={() => setActiveTarih(id)}
          className={activeTarih === id ? "tarihsecim active" : "tarihsecim"}
          key={id}
        >
          {title}
        </button>
      ))}
    </TarihSecimStyled>
  );
};

const TarihSecimStyled = styled.div`
  height: 12%;
  width: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 1000px) {
    height: 18%;
  }

  .tarihsecim {
    width: 13%;
    background: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    padding: 0.7rem;
    border-radius: 20px;
    color: var(--theme-fourth);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--theme-fourth);
      color: var(--theme-primary);
    }

    @media only screen and (max-width: 1000px) {
      width: 31%;
      padding: 0.3rem;
    }

    @media only screen and (max-width: 600px) {
      width: 45%;
    }
  }

  .active {
    background-color: var(--theme-fourth);
    color: var(--theme-primary);
  }
`;

export default TarihSecim;
