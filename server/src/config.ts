import * as dotenv from "dotenv";

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || "development";

export const keycloakAddress =
  process.env.KEYCLOAK_ADDRESS || "http://localhost:8180/auth";

export const keycloakRealm = process.env.KEYCLOAK_REALM || "TraderAdmin";

export const origin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

export const port = process.env.SERVER_PORT || "4000";

export const host = process.env.SERVER_HOST || "localhost";

console.log({ origin, host, port, keycloakAddress, keycloakRealm });
