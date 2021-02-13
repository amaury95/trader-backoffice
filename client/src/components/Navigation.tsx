import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { setSession, Store } from "store";

import { LogoutMutation } from "types";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const Navigation = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(Store);

  const [logout] = useMutation<LogoutMutation>(logoutMutation);

  const logoutHandler = async () => {
    await logout();
    dispatch(setSession(undefined));
    history.push("/");
  };

  const session = state.session?.session;

  return (
    <nav>
      <Link to="/">Trader Admin</Link>
      {session && (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {session.edges?.roles?.some((r) => r?.value === 3) && (
            <Link to="/dashboard/users">Users</Link>
          )}
        </>
      )}

      {session ? (
        <>
          <p>{session.email}</p>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/session">
            <button>Login</button>
          </Link>
          <Link to="/session/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </nav>
  );
};
