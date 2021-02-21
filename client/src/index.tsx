import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { keycloak } from "keycloak";

import reportWebVitals from "reportWebVitals";
import Routes from "Routes";
import StoreProvider from "store";
import { client } from "./apollo";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const App = () => {
  const { keycloak } = useKeycloak();
  return (
    <StoreProvider>
      <ApolloProvider client={client(keycloak.token)}>
        <Routes />
      </ApolloProvider>
    </StoreProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
