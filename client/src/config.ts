export const uri =
  process.env.REACT_APP_SERVER_ADDRESS ?? `http://80.209.237.197/graphql`;

export const keycloakServer =
  process.env.REACT_APP_KEYCLOAK_REDIRECT ?? "http://80.209.237.197/auth";

export const keycloakRealm =
  process.env.REACT_APP_KEYCLOAK_REALM ?? "TraderAdmin";

export const keycloakClientId =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? "web-client";
