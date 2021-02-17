import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "keycloak";

import reportWebVitals from "reportWebVitals";
import Routes from "Routes";
import StoreProvider from "store";
import { client } from "./apollo";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <StoreProvider>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </StoreProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
