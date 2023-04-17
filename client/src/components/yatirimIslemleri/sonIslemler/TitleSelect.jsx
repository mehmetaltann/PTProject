import styled from "styled-components";
import React from "react";
import { useYatirimContext } from "../../../context/yatirimContext";

const TitleSelect = React.memo(() => {
  const { setSelectedPortfoy, selectedPortfoy, portfoyler } = useYatirimContext();
  return (
    <TitleSelectStyled>
      <div className="title">
        <h3>Son İşlemler</h3>
      </div>
      <div className="select-menu">
        <label htmlFor="portfoy">Portföy Seçiniz:</label>
        <select
          required
          name="portfoy"
          id="portfoy"
          onChange={(e) => {
            setSelectedPortfoy(e.target.value);
          }}
        >
          {portfoyler.map((portfoy) => (
            <option value={portfoy.isim} key={portfoy.id}>
              {portfoy.isim}
            </option>
          ))}
        </select>
      </div>
    </TitleSelectStyled>
  );
});

const TitleSelectStyled = styled.div`
  width: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  color: var(--theme-fourth);
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    width: 20%;

    h3 {
      opacity: 0.7;
    }
  }

  .select-menu {
    width: 60%;
    font-size: 1.2rem;
    font-family: inherit;
    display: flex;
    align-items: center;

    label {
      width: 40%;
      opacity: 0.8rem;
    }

    select {
      flex: 1;
      font-size: inherit;
      font-family: inherit;
      outline: none;
      border: none;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      resize: none;
      border: var(--theme-inputBorder);
      box-shadow: var(--theme-box-shadow);
      color: var(--theme-fourth);
      opacity: 0.8;
    }
  }
`;

export default TitleSelect;
