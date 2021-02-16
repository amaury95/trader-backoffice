import { useKeycloak } from "@react-keycloak/web";
import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

interface Props {
  roles: string[];
  fallback?: string;
}

export const WithRoles: FunctionComponent<Props> = ({ children, ...props }) => {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    return <></>;
  }

  if (
    !keycloak.authenticated ||
    !props.roles.some((r) => keycloak.hasRealmRole(r))
  ) {
    return <>{props.fallback && <Redirect to={props.fallback} />}</>;
  }

  return <>{children}</>;
};
