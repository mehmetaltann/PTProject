import { useEffect } from "react";
import { InnerLayout } from "../../styles/Layout";
import { tarihSecim } from "../../utils/localData";
import ContentTitle from "./ContentTitle";
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
  activeTarih,
  setActiveTarih,
}) => {
  return (
    <GelGitStyled indicatorColor={indicatorColor}>
      <ContentTitle active={active} setActive={setActive} title={baslik}>
        {baslik}
      </ContentTitle>
      <div className="container">
        <div className="form-container">
          <div className="form">
            <h3>
              <span>{form_baslik}</span>
            </h3>
            <Form />
          </div>
          <div className="tarihSecim-container">
            {tarihSecim.map(({ id, title }) => (
              <button
                onClick={() => setActiveTarih(id)}
                className={
                  activeTarih === id ? "tarihsecim active" : "tarihsecim"
                }
                key={id}
              >
                {title}
              </button>
            ))}
          </div>
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

      .form {
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

      .tarihSecim-container {
        height: 35%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        margin-top: 2rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;

        .tarihsecim {
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
        }
        .active {
          background-color: var(--theme-fourth);
          color: var(--theme-primary);
        }
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
