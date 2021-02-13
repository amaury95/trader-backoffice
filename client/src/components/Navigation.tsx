import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { setSession, Store } from "store";
import { LogoutMutation } from "types";
import {
  Button,
  Header,
  // HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SkipToContent,
} from "carbon-components-react";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

const useNavigationData = () => {
  const history = useHistory();
  const { pathname: path } = useLocation();

  const { state, dispatch } = useContext(Store);

  const [logout] = useMutation<LogoutMutation>(logoutMutation);

  const [isExpanded, setIsExpanded] = useState(false);

  return { history, path, state, dispatch, logout, isExpanded, setIsExpanded };
};

export const Navigation = () => {
  const {
    history,
    path,
    state,
    dispatch,
    logout,
    isExpanded,
    setIsExpanded,
  } = useNavigationData();

  const logoutHandler = async () => {
    await logout();
    dispatch(setSession(undefined));
    history.push("/");
  };

  const onClickSideNavExpand = () => setIsExpanded(!isExpanded);

  const session = state.session?.session;

  const MenuItems = () => (
    <>
      <HeaderMenuItem
        isCurrentPage={path.endsWith("/dashboard")}
        href="/#/dashboard"
      >
        Dashboard
      </HeaderMenuItem>
      {session?.edges?.roles?.some((r) => [2, 3].includes(r.value)) && (
        <HeaderMenuItem
          isCurrentPage={path.endsWith("/dashboard/users")}
          href="/#/dashboard/users"
        >
          Users
        </HeaderMenuItem>
      )}
      {session && (
        <HeaderMenu menuLinkName="Finances">
          <HeaderMenuItem>Transfer</HeaderMenuItem>

          {session?.edges?.roles?.some((r) => [3].includes(r.value)) && (
            <>
              <HeaderMenuItem>Income</HeaderMenuItem>
              <HeaderMenuItem>Deposit</HeaderMenuItem>
            </>
          )}
        </HeaderMenu>
      )}
    </>
  );

  return (
    <>
      <Header aria-label="trader admin">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isExpanded}
        />
        <Link to="/">
          <HeaderName prefix="Trader"> Admin</HeaderName>
        </Link>
        <HeaderNavigation>
          <MenuItems />
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isExpanded}
          isPersistent={false}
        >
          <MenuItems />
        </SideNav>
        <HeaderGlobalBar>
          {session && <Button onClick={logoutHandler}>Logout</Button>}
        </HeaderGlobalBar>
      </Header>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
};
