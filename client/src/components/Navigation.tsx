import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { setSession, Store } from "store";
import { LogoutMutation } from "types";
import {
  Button,
  Header,
  // HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from "carbon-components-react";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const Navigation = () => {
  const history = useHistory();
  const { pathname: path } = useLocation();

  const { state, dispatch } = useContext(Store);

  const [logout] = useMutation<LogoutMutation>(logoutMutation);

  const logoutHandler = async () => {
    await logout();
    dispatch(setSession(undefined));
    history.push("/");
  };

  const session = state.session?.session;

  return (
    <>
      <Header aria-label="trader admin">
        <Link to="/">
          <HeaderName prefix="Trader"> Admin</HeaderName>
        </Link>
        <HeaderNavigation>
          <HeaderMenuItem
            isCurrentPage={path.endsWith("/dashboard")}
            href="/#/dashboard"
          >
            Dashboard
          </HeaderMenuItem>
          {session?.edges?.roles?.some((r) => r?.value === 3) && (
            <HeaderMenuItem
              isCurrentPage={path.endsWith("/dashboard/users")}
              href="/#/dashboard/users"
            >
              Users
            </HeaderMenuItem>
          )}
        </HeaderNavigation>

        <HeaderGlobalBar>
          {session && (
            <>
              {/* <HeaderGlobalAction aria-label="App Switcher"></HeaderGlobalAction> */}
              <Button onClick={logoutHandler}>Logout</Button>
            </>
          )}
        </HeaderGlobalBar>
      </Header>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
};
