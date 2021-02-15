import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

import { client } from "./apollo";
import reportWebVitals from "./reportWebVitals";
import Routes from "./Routes";

import StoreProvider from "store";

import "./index.css";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
