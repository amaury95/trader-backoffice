import { useKeycloak } from "@react-keycloak/web";
import { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

export const DashboardLayout: FunctionComponent = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <Redirect to="/" />;
  }

  return <Container>{children}</Container>;
};
