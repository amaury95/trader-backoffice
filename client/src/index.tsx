import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

import { client } from "./apollo";
import reportWebVitals from "./reportWebVitals";
import Routes from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
