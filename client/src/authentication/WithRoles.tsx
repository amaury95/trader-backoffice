import { FunctionComponent, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Store } from "store";
import { SessionQuery_session_edges_roles } from "types";

interface Props {
  roles: number[];
  fallback?: string;
  inclusive?: boolean;
}

export const WithRoles: FunctionComponent<Props> = ({ children, ...props }) => {
  const { state } = useContext(Store);

  const roles = state.session?.session?.edges?.roles;

  const covers = (r: SessionQuery_session_edges_roles) =>
    props.roles.includes(r.value);

  if (props.inclusive ? roles?.every(covers) : roles?.some(covers)) {
    return <>{children}</>;
  }

  if (props.fallback) return <Redirect to={props.fallback} />;

  return <></>;
};
