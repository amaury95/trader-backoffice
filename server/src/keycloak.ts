import axios from "axios";
import { JWK, JWS } from "node-jose";

const jwksAddress =
  "http://localhost:8180/auth/realms/TraderAdmin/protocol/openid-connect/certs";

export const KeycloakSession = async () => {
  const jwks = await axios.get(jwksAddress);
  const keystore = JWK.createKeyStore();

  jwks.data.keys.forEach((key: any) => {
    keystore.add(key);
  });

  const verifier = JWS.createVerify(keystore);

  return async (jwt: string) => {
    const { payload } = await verifier.verify(jwt);

    return JSON.parse(payload.toString());
  };
};
