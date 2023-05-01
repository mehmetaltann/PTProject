import styled from "styled-components";
import { tarihSecim } from "../../utils/localData";
import { useGlobalContext } from "../../context/globalContext";

const TarihSecim = () => {
  const { activeTarih, setActiveTarih } = useGlobalContext();
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
    height: 13%;
  }

  @media only screen and (max-width: 680px) {
    height: 16%;
  }
  @media only screen and (max-width: 600px) {
    height: 8%;
  }

  @media only screen and (max-width: 375px) {
    height: 10%;
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
      width: 30%;
      padding: 0.3rem;
    }

    @media only screen and (max-width: 680px) {
      width: 22%;
    }

    @media only screen and (max-width: 600px) {
      width: 30%;
    }

    @media only screen and (max-width: 375px) {
      width: 25%;
    }
  }

  .active {
    background-color: var(--theme-fourth);
    color: var(--theme-primary);
    font-size: 1.1rem;
  }
`;

export default TarihSecim;
