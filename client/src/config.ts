console.log("config.ts", process.env);

export const uri =
  process.env.REACT_APP_SERVER_ADDRESS ?? `http://195.181.247.138/graphql`;

export const keycloakServer =
  process.env.REACT_APP_KEYCLOAK_REDIRECT ?? "http://195.181.247.138/auth";

export const keycloakRealm =
  process.env.REACT_APP_KEYCLOAK_REALM ?? "TraderAdmin";

export const keycloakClientId =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? "web-client";

console.log({ uri, keycloakServer, keycloakRealm, keycloakClientId });
