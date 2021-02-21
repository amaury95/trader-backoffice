import { useKeycloak } from "@react-keycloak/web";
import { WithRoles } from "components/WithRoles";
import { DepositForm, IncomeForm, TransferForm } from "modules/dashboard/forms";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Menu, Dropdown, Segment } from "semantic-ui-react";

const useModalForm = (): [boolean, () => void, () => void] => {
  const [state, setState] = useState(false);
  const onClose = () => setState(false);
  const onOpen = () => setState(true);
  return [state, onOpen, onClose];
};

export const Navigation = () => {
  const { keycloak } = useKeycloak();

  const { pathname } = useLocation();
  const history = useHistory();

  const [transferForm, showTransferForm, closeTransferForm] = useModalForm();
  const [depositForm, showDepositForm, closeDepositForm] = useModalForm();
  const [incomeForm, showIncomeForm, closeIncomeForm] = useModalForm();

  const handleLogout = () => keycloak.logout();
  const handleLogin = () => keycloak.login();

  return (
    <>
      <WithRoles roles={["investor"]}>
        <TransferForm open={transferForm} onClose={closeTransferForm} />
      </WithRoles>
      <WithRoles roles={["admin"]}>
        <DepositForm open={depositForm} onClose={closeDepositForm} />
        <IncomeForm open={incomeForm} onClose={closeIncomeForm} />
      </WithRoles>
      <Segment inverted basic>
        <Menu inverted secondary>
          <Menu.Item
            header
            name="Trader Admin"
            onClick={() => history.push(`/`)}
          />

          <WithRoles roles={["admin", "accountant", "investor"]}>
            <Menu.Item
              name="Dashboard"
              active={pathname.endsWith("/dashboard")}
              onClick={() => history.push(`/dashboard`)}
            />
            <Menu.Item
              name="Users"
              active={pathname.endsWith("/dashboard/users")}
              onClick={() => history.push(`/dashboard/users`)}
            />
          </WithRoles>
          <WithRoles roles={["admin", "accountant"]}>
            <Menu.Item
              name="Accounts"
              active={pathname.endsWith("/dashboard/accounts")}
              onClick={() => history.push(`/dashboard/accounts`)}
            />
          </WithRoles>
          <WithRoles roles={["admin", "accountant", "investor"]}>
            <Dropdown item text="Operations">
              <Dropdown.Menu>
                <Dropdown.Header>Financial Operations</Dropdown.Header>
                <WithRoles roles={["investor"]}>
                  <Dropdown.Item onClick={showTransferForm}>
                    Transfer
                  </Dropdown.Item>
                </WithRoles>
                <WithRoles roles={["admin"]}>
                  <Dropdown.Item onClick={showDepositForm}>
                    Deposit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={showIncomeForm}>Income</Dropdown.Item>
                </WithRoles>
              </Dropdown.Menu>
            </Dropdown>
          </WithRoles>
          <Menu.Menu position="right">
            {keycloak.authenticated ? (
              <Menu.Item name="Logout" onClick={handleLogout} />
            ) : (
              <Menu.Item name="Login" onClick={handleLogin} />
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
};
