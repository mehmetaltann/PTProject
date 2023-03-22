import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { butceCategoryData, tarihSecim } from "../../utils/localData";
import styled from "styled-components";
import Chart from "./Chart";

const Dashboard = ({ activeTarih, setActiveTarih }) => {
  const {
    gelirGetir,
    giderGetir,
    toplamGelir,
    toplamGider,
    ortalamaGelir,
    ortalamaGider,
    totalBalance,
  } = useGlobalContext();

  useEffect(() => {
    gelirGetir();
    giderGetir();
  }, [activeTarih]);

  const totalCat = [
    { id: 1, title: "Toplam Gelir", value: toplamGelir(), stil: "gelir" },
    { id: 2, title: "Toplam Gider", value: toplamGider(), stil: "gider" },
    {
      id: 3,
      title: "Ortalama Aylık Gelir",
      value: ortalamaGelir(),
      stil: "gelir",
    },
    {
      id: 4,
      title: "Ortalama Aylık Gider",
      value: ortalamaGider(),
      stil: "gider",
    },
    { id: 5, title: "Gelir-Gider Farkı", value: totalBalance(), stil: "" },
  ];

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
            {totalCat.map(({ id, title, value, stil }) => (
              <div className="total" key={id}>
                <h4>{title}</h4>
                <h4 className={value < 0 ? `${stil} eksi` : `${stil} arti`}>
                  {value} TL
                </h4>
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
                  <p>{categoryA}&nbsp;:</p>{" "}
                  <span> {toplamGelir(categoryA)} TL</span>
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
                    <p>{categoryB}&nbsp;:</p>{" "}
                    <span> {toplamGider(categoryB)}</span>
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
  overflow: hidden;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 0.8rem;
    padding-top: 0.8rem;
    overflow: auto;

    @media only screen and (max-width: 600px) {
      flex-wrap: wrap;
    }

    .left-container {
      height: 90%;
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @media only screen and (max-width: 600px) {
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
        justify-content: center;
      }

      .totals-container {
        height: 20%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        @media only screen and (max-width: 1200px) {
          height: 25%;
        }

        @media only screen and (max-width: 850px) {
          height: 35%;
        }

        .total {
          width: 18%;
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          @media only screen and (max-width: 1460px) {
            width: 31%;
          }

          @media only screen and (max-width: 800px) {
            width: 46%;
          }

          h4 {
            text-align: center;
            font-size: 1rem;
            opacity: 0.6;
          }

          .eksi {
            color: var(--theme-red);
          }

          .arti {
            color: var(--theme-green);
          }

          .gelir {
            color: var(--theme-green);
          }

          .gider {
            color: var(--theme-red);
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
      overflow: hidden;

      @media only screen and (max-width: 600px) {
        flex-wrap: wrap;
        overflow: auto;
      }

      .gelir-container {
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
      }

      .gider-container {
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
      }
    }
  }
`;

export default Dashboard;
