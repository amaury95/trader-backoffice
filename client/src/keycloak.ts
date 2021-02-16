import Keycloak from "keycloak-js";

export const keycloak = Keycloak({
  url: "http://localhost:8180/auth",
  realm: "TraderAdmin",
  clientId: "web-client",
});
