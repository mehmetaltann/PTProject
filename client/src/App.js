import styled from "styled-components";
import { Rotalar } from "./Routes";

function App() {
  return (
    <AppStyled>
      <Rotalar />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
`;

export default App;
