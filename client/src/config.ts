import dotenv from "dotenv";
dotenv.config();

const serverHost = process.env.SERVER_HOST || "localhost";
const serverPort = process.env.SERVER_PORT || 4000;

export const uri = `http://${serverHost}:${serverPort}/graphql`;

export const keycloakServer =
  process.env.KEYCLOAK_ADDRESS || "http://localhost:8180/auth";

export const keycloakRealm = process.env.KEYCLOAK_REALM || "TraderAdmin";

export const keycloakClientId = process.env.KEYCLOAK_CLIENT_ID || "web-client";
