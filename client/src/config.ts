import dotenv from "dotenv";
dotenv.config();

export const uri =
  process.env.SERVER_ADDRESS || `https://195.181.247.138/graphql`;

export const keycloakServer =
  process.env.KEYCLOAK_REDIRECT || "https://195.181.247.138/auth";

export const keycloakRealm = process.env.KEYCLOAK_REALM || "TraderAdmin";

export const keycloakClientId = process.env.KEYCLOAK_CLIENT_ID || "web-client";

console.log({ uri, keycloakServer, keycloakRealm, keycloakClientId });
