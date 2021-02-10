import { gql, useQuery } from "@apollo/client";
import { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { SessionQuery } from "types";

export const sessionQuery = gql`
  query SessionQuery {
    me {
      id
      email
    }
  }
`;

export const DashboardLayout: FunctionComponent = ({ children }) => {
  const { data, loading } = useQuery<SessionQuery>(sessionQuery);

  if (!data || loading) {
    return <div>loading...</div>;
  }

  if (!data.me) {
    return <Redirect to="session" />;
  }

  return (
    <div>
      {data.me.email} {children}
    </div>
  );
};
