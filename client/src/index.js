import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./store/globalContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalProvider>
        <GlobalStyle />
        <App />
      </GlobalProvider>
    </Provider>
  </React.StrictMode>
);
