import axios from "axios";
import { JWK, JWS } from "node-jose";

import { keycloakAddress, keycloakRealm } from "./config";

export interface Payload {
  sub: string;
  name: string;
  email: string;
  realm_access: {
    roles: string[];
  };
}

const jwksAddress = `${keycloakAddress}/realms/${keycloakRealm}/protocol/openid-connect/certs`;

export const KeycloakSession = async () => {
  const jwks = await axios.get(jwksAddress);
  const keystore = JWK.createKeyStore();

  jwks.data.keys.forEach((key: any) => {
    keystore.add(key);
  });

  const verifier = JWS.createVerify(keystore);

  return async (jwt?: string): Promise<Payload | null> => {
    if (jwt) {
      const { payload } = await verifier.verify(jwt);

      return JSON.parse(payload.toString());
    }

    return null;
  };
};
