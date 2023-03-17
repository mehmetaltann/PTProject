import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { tarihSecim } from "../../utils/localData";
import { totalCat, butceCategoryData } from "../../utils/localData";
import styled from "styled-components";
import Chart from "./Chart";

const Dashboard = ({ activeTarih, setActiveTarih }) => {
  const { gelirGetir, giderGetir } = useGlobalContext();

  useEffect(() => {
    gelirGetir();
    giderGetir();
  }, []);

  return (
    <DashboardStyled>
      <div className="container">
        <div className="left-container">
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
          <div className="chart-container">
            <Chart />
          </div>
          <div className="totals-container">
            {totalCat.map((cat, index) => (
              <div className="total" key={index}>
                <h4>{cat}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="right-container">
          <div className="gelir-container">
            <h3>Gelirler</h3>
            {butceCategoryData
              .filter((cat) => cat.type === "Gelir")
              .map(({ id, categoryA }) => (
                <div className="gelir" key={id}>
                  {categoryA}
                </div>
              ))}
          </div>

          <div className="gider-container">
            <h3>Giderler</h3>
            <div className="gider-con">
              {butceCategoryData
              .filter((cat) => cat.type === "Gider")
              .map(({ id, categoryB }) => (
                <div className="gider" key={id}>
                  {categoryB}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 0.8rem;
    padding-top: 0.8rem;

    @media only screen and (max-width: 1250px) {
      flex-wrap: wrap;
    }

    .left-container {
      height: 90%;
      width: 50%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      gap: 0.5rem;

      @media only screen and (max-width: 750px) {
        width: 100%;
      }

      .tarihSecim-container {
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
        gap: 1rem;
        flex-wrap: wrap;

        @media only screen and (max-width: 1460px) {
          height: 15%;
        }

        @media only screen and (max-width: 800px) {
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

          @media only screen and (max-width: 1460px) {
            width: 31%;
            padding: 0.3rem;
          }

          @media only screen and (max-width: 800px) {
            width: 48%;
          }
          @media only screen and (max-width: 375px) {
            width: 99%;
          }
        }

        .active {
          background-color: var(--theme-fourth);
          color: var(--theme-primary);
        }
      }

      .chart-container {
        flex: 1;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .totals-container {
        height: 30%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        .total {
          width: 15%;
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          @media only screen and (max-width: 1460px) {
            width: 31%;
          }

          @media only screen and (max-width: 800px) {
            width: 48%;
          }
          @media only screen and (max-width: 375px) {
            width: 99%;
          }

          h4 {
            text-align: center;
            font-size: 1rem;
            opacity: 0.6;
          }
        }
      }
    }

    .right-container {
      height: 90%;
      flex: 1;
      display: flex;
      gap: 0.6rem;
      font-size: 1rem;

      @media only screen and (max-width: 500px) {
        flex-wrap: wrap;
      }

      .gelir-container {
        width: 35%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media only screen and (max-width: 500px) {
          width: 100%;
        }

        .gelir {
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
        }
      }

      .gider-container {
        flex: 1;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        overflow: auto;
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
            width: 32%;
            background: var(--theme-secondary);
            border: var(--theme-border);
            box-shadow: var(--theme-box-shadow);
            padding: 1rem;
            border-radius: 20px;

            @media only screen and (max-width: 1460px) {
              width: 48%;
            }

            @media only screen and (max-width: 800px) {
              width: 90%;
            }
          }
        }
      }
    }
  }
`;

export default Dashboard;
