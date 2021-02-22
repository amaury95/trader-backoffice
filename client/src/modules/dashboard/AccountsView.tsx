import { gql, useQuery } from "@apollo/client";
import { AccountsQueryVariables, AccountsQuery, Statistics } from "types";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { Store } from "store";
import EndlessQuery from "components/EndlessQuery";
import { Divider, Grid, Input, Item, Statistic } from "semantic-ui-react";

const accountsQuery = gql`
  query AccountsQuery($keywords: String, $limit: Int, $offset: Int) {
    elements: accounts(keywords: $keywords, limit: $limit, offset: $offset) {
      id
      name
      username
      email
      balance
      fee
    }
  }
`;

const brokerBalanceQuery = gql`
  query Statistics {
    brokerBalance
    totalAccounts
  }
`;

export default function AccountsView() {
  const { state } = useContext(Store);
  const [keywords, setKeywords] = useState("");

  const { data: statistics } = useQuery<Statistics>(brokerBalanceQuery);

  return (
    <Grid>
      <Grid.Column mobile={16} tablet={6} computer={4}>
        {statistics && (
          <div style={{ textAlign: "center" }}>
            <Statistic color="green">
              <Statistic.Value>
                <CurrencyDisplay
                  amount={statistics.brokerBalance}
                  currency={state.currency}
                />
              </Statistic.Value>
              <Statistic.Label>Total Balance</Statistic.Label>
            </Statistic>

            <Divider />

            <Statistic color="blue">
              <Statistic.Value>{statistics.totalAccounts}</Statistic.Value>
              <Statistic.Label>Total Users</Statistic.Label>
            </Statistic>
          </div>
        )}
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={12}>
        <Input
          icon="search"
          placeholder="Search..."
          size="huge"
          fluid
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <br />
        <EndlessQuery<AccountsQuery, AccountsQueryVariables>
          query={accountsQuery}
          variables={{ limit: 20, keywords }}
        >
          {(data) => (
            <Item.Group relaxed divided>
              {data.elements?.map((a) => (
                <Item key={a.id}>
                  <Item.Image
                    size="tiny"
                    src={`https://react.semantic-ui.com/images/avatar/large/matthew.png`}
                  />

                  <Item.Content>
                    <Item.Header>
                      <Link to={`/dashboard/accounts/${a.id}`}>{a.name}</Link>{" "}
                      <i className="nickname">@{a.username}</i>
                    </Item.Header>
                    <Item.Description>
                      <Statistic size="mini" color="green">
                        <Statistic.Label>Balance</Statistic.Label>
                        <Statistic.Value>
                          <CurrencyDisplay amount={a.balance} currency="USD" />
                        </Statistic.Value>
                      </Statistic>
                      <Statistic size="mini" color="blue">
                        <Statistic.Label>Fees</Statistic.Label>
                        <Statistic.Value>{a.fee * 100}%</Statistic.Value>
                      </Statistic>
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          )}
        </EndlessQuery>
      </Grid.Column>
    </Grid>
  );
}
