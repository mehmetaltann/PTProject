import { useState, useEffect } from "react";
import { PageLayout } from "../styles/Layout";
import { useGlobalContext } from "../context/globalContext";
import Dashboard from "../components/genelDurum/Dashboard";
import styled from "styled-components";

const GenelDurum = () => {
  return (
    <PageLayout>
      <GenelDurumMain>
        <Dashboard />
      </GenelDurumMain>
    </PageLayout>
  );
};

const GenelDurumMain = styled.main`
  height: 90%;
  width: 100%;

  @media only screen and (max-width: 500px) {
    overflow: auto;
  }
`;

export default GenelDurum;
