import { useState } from "react";
import { Grid, Menu } from "semantic-ui-react";
import { AccountQuery_account } from "types";
import AccountCard from "./components/AccountCard";
import EditProfile from "./components/EditProfile";
import Statistics from "./components/Statistics";
import Transactions from "./components/Transactions";

const statisticsMenu = "statistics";
const transactionsMenu = "transactions";
const editionMenu = "edit_account";

const useMenuState = (initial?: string) => {
  const [menuState, setMenuState] = useState(initial || statisticsMenu);
  const activeMenu = (value: string) => menuState === value;
  return { menuState, setMenuState, activeMenu };
};

export interface ProfileViewProps {
  account: AccountQuery_account;
}

export default function Profile({ account }: ProfileViewProps) {
  const { setMenuState, activeMenu } = useMenuState(statisticsMenu);

  return (
    <Grid>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <AccountCard account={account} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={12}>
        <Menu pointing>
          <Menu.Item
            name="Statistics"
            active={activeMenu(statisticsMenu)}
            onClick={() => setMenuState(statisticsMenu)}
          />
          <Menu.Item
            name="Transactions"
            active={activeMenu(transactionsMenu)}
            onClick={() => setMenuState(transactionsMenu)}
          />
          <Menu.Item
            name="Edit Account"
            active={activeMenu(editionMenu)}
            onClick={() => setMenuState(editionMenu)}
          />
        </Menu>
        {activeMenu(statisticsMenu) && <Statistics />}
        {activeMenu(transactionsMenu) && <Transactions />}
        {activeMenu(editionMenu) && <EditProfile account={account} />}
      </Grid.Column>
    </Grid>
  );
}
