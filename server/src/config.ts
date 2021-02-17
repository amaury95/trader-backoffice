import * as dotenv from "dotenv";

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || "development";

export const keycloakAddress =
  process.env.KEYCLOAK_ADDRESS || "http://localhost:8180";

export const keycloakRealm = process.env.KEYCLOAK_REALM || "TraderAdmin";

export const origin = process.env.ORIGIN || "http://localhost:3000";

export const port = process.env.PORT || "4000";

export const host = process.env.HOST || "localhost";
