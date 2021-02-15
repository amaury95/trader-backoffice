import { setSession } from "store";

import { DepositForm, IncomeForm, TransferForm } from "modules/dashboard/forms";
import { useNavigationData } from "./hooks";
import { Link } from "react-router-dom";
import { WithRoles } from "authentication/WithRoles";

export const Navigation = () => {
  const { history, state, dispatch, logout } = useNavigationData();

  const handleLogout = async () => {
    await logout();
    dispatch(setSession(undefined));
    history.push("/");
  };

  const session = state.session?.session;

  return (
    <>
      <WithRoles roles={[3]}>
        <DepositForm />
        <IncomeForm />
      </WithRoles>
      <WithRoles roles={[1, 2, 3]}>
        <TransferForm />
      </WithRoles>
      <ul>
        <li>
          <Link to="/">Trader Admin</Link>
        </li>
        <>
          <WithRoles roles={[1, 2, 3]}>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </WithRoles>
          <WithRoles roles={[2, 3]}>
            <li>
              <Link to="/dashboard/users">Users</Link>
            </li>
          </WithRoles>
        </>
        {session ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/session">
                <button>Login</button>
              </Link>
            </li>
            <li>
              <Link to="/session/register">
                <button>Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
