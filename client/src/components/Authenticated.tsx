import { gql } from "@apollo/client";
import { client } from "../apollo";
import { FunctionComponent, useContext } from "react";
import { setSession, Store } from "store";
import { SessionQuery } from "types";
import { useHistory } from "react-router-dom";

export const query = gql`
  query SessionQuery {
    session {
      id
      name
      email
      edges {
        roles {
          value
        }
      }
    }
  }
`;

interface Props {
  fallback: string;
}

export const Authenticated: FunctionComponent<Props> = ({
  children,
  fallback,
}) => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);

  if (state.session) {
    return <>{children}</>;
  }

  client
    .query<SessionQuery>({ query, fetchPolicy: "no-cache" })
    .then(({ data }) => {
      if (data.session) {
        dispatch(setSession(data));
      } else {
        history.push(fallback);
      }
    });

  return <div>loading session...</div>;
};
