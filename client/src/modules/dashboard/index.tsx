import { useKeycloak } from "@react-keycloak/web";
import { HomeLayout } from "modules/home";
import { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

export const DashboardLayout: FunctionComponent = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <Redirect to="/" />;
  }

  return <>{keycloak.token}</>;
};
