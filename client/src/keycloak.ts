import Keycloak from "keycloak-js";

export const keycloak = Keycloak({
  url: process.env.KEYCLOAK_SERVER || "http://localhost:8180/auth",
  realm: process.env.KEYCLOAK_REALM || "TraderAdmin",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "web-client",
});
