import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const TotalInf = () => {
  const { ortalamaButceData, toplamButceData } = useGlobalContext();
  const balance = (toplamButceData("gelir") - toplamButceData("gider")).toFixed(
    2
  );

  const totalCat = [
    {
      id: 1,
      title: "Toplam Gelir",
      value: toplamButceData("gelir"),
      stil: "gelir",
    },
    {
      id: 2,
      title: "Toplam Gider",
      value: toplamButceData("gider"),
      stil: "gider",
    },
    {
      id: 3,
      title: "Ortalama Aylık Gelir",
      value: ortalamaButceData("gelir"),
      stil: "gelir",
    },
    {
      id: 4,
      title: "Ortalama Aylık Gider",
      value: ortalamaButceData("gider"),
      stil: "gider",
    },
    { id: 5, title: "Gelir-Gider Farkı", value: balance, stil: "" },
  ];

  return (
    <TotalInfStyled>
      {totalCat.map(({ id, title, value, stil }) => (
        <div className="total" key={id}>
          <h4>{title}</h4>
          <h4 className={value < 0 ? `${stil} eksi` : `${stil} arti`}>
            {value} TL
          </h4>
        </div>
      ))}
    </TotalInfStyled>
  );
};

const TotalInfStyled = styled.div`
  height: 20%;
  width: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 1460px) {
    height: 24%;
  }

  @media only screen and (max-width: 1200px) {
    height: 25%;
  }

  @media only screen and (max-width: 1000px) {
    height: 28%;
  }

  @media only screen and (max-width: 800px) {
    height: 35%;
  }

  @media only screen and (max-width: 600px) {
    height: 23%;
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
      width: 30%;
      gap: 0.3rem;
    }

    @media only screen and (max-width: 800px) {
      width: 46%;
      height: 30%;
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
`;

export default TotalInf;
