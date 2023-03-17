import { useState, useEffect } from "react";
import { PageLayout } from "../styles/Layout";
import { useGlobalContext } from "../context/globalContext";
import GelGit from "../components/aileButcesi/GelGit";
import styled from "styled-components";
import GiderForm from "../components/aileButcesi/GiderForm";
import GelirForm from "../components/aileButcesi/GelirForm";
import GelirItem from "../components/aileButcesi/GelirItem";
import GiderItem from "../components/aileButcesi/GiderItem";

const AileButcesiPage = () => {
  const [active, setActive] = useState(1);
  const {
    giderler,
    gelirGetir,
    giderGetir,
    giderSil,
    toplamGider,
    gelirler,
    gelirSil,
    toplamGelir,
  } = useGlobalContext();

  useEffect(() => {
    gelirGetir();
    giderGetir();
  }, []);

  const giderMap = giderler.map(
    ({ _id, title, amount, date, categoryA, categoryB, description }) => {
      return (
        <GiderItem
          key={_id}
          id={_id}
          title={title}
          amount={amount}
          date={date}
          categoryA={categoryA}
          categoryB={categoryB}
          description={description}
          indicatorColor={"var(--theme-red)"}
          deleteItem={giderSil}
        />
      );
    }
  );

  const gelirMap = gelirler.map(
    ({ _id, title, amount, date, category, description }) => {
      return (
        <GelirItem
          key={_id}
          id={_id}
          title={title}
          amount={amount}
          date={date}
          category={category}
          description={description}
          indicatorColor={"var(--theme-green)"}
          deleteItem={gelirSil}
        />
      );
    }
  );

  const displayData = () => {
    switch (active) {
      case 1:
        return (
          <GelGit
            Form={GelirForm}
            baslik={"Gelirler"}
            form_baslik={"Yeni Gelir"}
            data_baslik={"Toplam Gelir:"}
            data={gelirMap}
            toplamGider={toplamGelir}
            indicatorColor={"var(--theme-green)"}
            active={active}
            setActive={setActive}
          />
        );
      case 2:
        return (
          <GelGit
            Form={GiderForm}
            baslik={"Giderler"}
            form_baslik={"Yeni Gider"}
            data_baslik={"Toplam Gider:"}
            data={giderMap}
            toplamGider={toplamGider}
            indicatorColor={"var(--theme-red)"}
            active={active}
            setActive={setActive}
          />
        );
      default:
        return (
          <GelGit
            Form={GelirForm}
            baslik={"Gelirler"}
            form_baslik={"Yeni Gelir"}
            data_baslik={"Toplam Gelir:"}
            data={gelirMap}
            toplamGider={toplamGelir}
            indicatorColor={"var(--theme-green)"}
            active={active}
            setActive={setActive}
          />
        );
    }
  };

  return (
    <PageLayout>
      <MainStyle>{displayData()}</MainStyle>
    </PageLayout>
  );
};

const MainStyle = styled.main`
  height: 90%;
  width: 100%;

  @media only screen and (max-width: 500px) {
    overflow: auto;
  }
`;

export default AileButcesiPage;
