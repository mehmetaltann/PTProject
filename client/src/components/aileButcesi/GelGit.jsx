import { useEffect } from "react";
import { InnerLayout } from "../../styles/Layout";
import ContentTitle from "../ContentTitle";
import styled from "styled-components";

const GelGit = ({
  baslik,
  form_baslik,
  data_baslik,
  Form,
  data,
  toplamGider,
  indicatorColor,
  setActive,
  active,
}) => {
  return (
    <GelGitStyled indicatorColor={indicatorColor}>
      <ContentTitle active={active} setActive={setActive} title={baslik}>
        {baslik}
      </ContentTitle>
      <div className="container">
        <div className="form-container">
          <h3>
            <span>{form_baslik}</span>
          </h3>
          <Form />
        </div>
        <div className="data-container">
          <h3>
            {data_baslik} <span> {toplamGider()} TL</span>
          </h3>
          {data}
        </div>
      </div>
    </GelGitStyled>
  );
};

const GelGitStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-top: 0.8rem;

    .form-container {
      width: 22%;
      background-color: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      border-radius: 20px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      text-align: center;

      h3 {
        margin-bottom: 1rem;
      }

      @media only screen and (max-width: 1250px) {
        width: 30%;
      }

      @media only screen and (max-width: 750px) {
        width: 40%;
      }

      @media only screen and (max-width: 500px) {
        flex-wrap: wrap;
        width: 100%;
      }
    }

    .data-container {
      flex: 1;
      height: 700px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      border-radius: 20px;
      padding: 1rem;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      h3 {
        margin-bottom: 1rem;

        span {
          color: ${(props) => props.indicatorColor};
          opacity: 0.8;
        }
      }
    }
  }
`;

export default GelGit;
