import { useKeycloak } from "@react-keycloak/web";
import { WithRoles } from "components/WithRoles";
import { DepositForm, IncomeForm, TransferForm } from "modules/dashboard/forms";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const { keycloak } = useKeycloak();

  const handleLogout = () => keycloak.logout();
  const handleLogin = () => keycloak.login();

  return (
    <>
      <WithRoles roles={["investor"]}>
        <TransferForm />
      </WithRoles>
      <WithRoles roles={["admin"]}>
        <DepositForm />
        <IncomeForm />
      </WithRoles>
      <ul>
        <li>
          <Link to="/">Trader Admin</Link>
        </li>
        <WithRoles roles={["admin", "accountant", "investor"]}>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/users">Users</Link>
          </li>
        </WithRoles>
        <WithRoles roles={["admin", "accountant"]}>
          <li>
            <Link to="/dashboard/accounts">Accounts</Link>
          </li>
        </WithRoles>
        {keycloak.authenticated ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
