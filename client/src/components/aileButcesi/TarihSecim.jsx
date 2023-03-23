import { Fragment } from "react";
import { tarihSecim } from "../../utils/localData";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";

const TarihSecim = () => {
  const { activeTarih, setActiveTarih } = useGlobalContext();
  return (
    <Fragment>
      {tarihSecim.map(({ id, title }) => (
        <TarihSecimStyled
          onClick={() => setActiveTarih(id)}
          className={activeTarih === id ? "tarihsecim active" : "tarihsecim"}
          key={id}
        >
          {title}
        </TarihSecimStyled>
      ))}
    </Fragment>
  );
};

const TarihSecimStyled = styled.button`
  width: 35%;
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
`;

export default TarihSecim;
