import { setCurrency, setSession } from "store";
import {
  Button,
  ButtonSet,
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
import { DepositForm, IncomeForm, TransferForm } from "modules/dashboard/forms";
import { useFormsData, useNavigationData } from "./hooks";

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

  const {
    showTransferForm,
    setShowTransferForm,
    showDepositForm,
    setShowDepositForm,
    showIncomeForm,
    setShowIncomeForm,
  } = useFormsData();

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
        <HeaderMenu menuLinkName="Finances" aria-label="finances menu">
          <HeaderMenuItem onClick={() => setShowTransferForm(true)}>
            Transfer
          </HeaderMenuItem>

          {session?.edges?.roles?.some((r) => [3].includes(r.value)) && (
            <HeaderMenuItem onClick={() => setShowDepositForm(true)}>
              Deposit
            </HeaderMenuItem>
          )}
          {session?.edges?.roles?.some((r) => [3].includes(r.value)) && (
            <HeaderMenuItem onClick={() => setShowIncomeForm(true)}>
              Income
            </HeaderMenuItem>
          )}
        </HeaderMenu>
      )}
      <HeaderMenu menuLinkName={state.currency} aria-label="currencies menu">
        {["USD", "EUR", "GBP", "BTC"].map((currency, k) => (
          <HeaderMenuItem
            onClick={() => dispatch(setCurrency(currency))}
            key={k}
          >
            {currency}
          </HeaderMenuItem>
        ))}
      </HeaderMenu>
    </>
  );

  return (
    <>
      <DepositForm
        visible={showDepositForm}
        setVisivility={setShowDepositForm}
      />
      <IncomeForm visible={showIncomeForm} setVisivility={setShowIncomeForm} />
      <TransferForm
        visible={showTransferForm}
        setVisivility={setShowTransferForm}
      />
      <Header aria-label="trader admin">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isExpanded}
        />
        <HeaderName prefix="Trader" href="/#/">
          Admin
        </HeaderName>
        <HeaderNavigation aria-label="navigation">
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
          {session && (
            <ButtonSet>
              <Button onClick={logoutHandler}>Logout</Button>
            </ButtonSet>
          )}
        </HeaderGlobalBar>
      </Header>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
};
