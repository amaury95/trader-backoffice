import { keycloakClientId, keycloakRealm, keycloakServer } from "config";
import Keycloak from "keycloak-js";

export const keycloak = Keycloak({
  clientId: keycloakClientId,
  realm: keycloakRealm,
  url: keycloakServer,
});
