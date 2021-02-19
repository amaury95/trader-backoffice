import { gql, useQuery } from "@apollo/client";
import { AccountsQueryVariables, AccountsQuery, BrokerBalance } from "types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { Store } from "store";
import EndlessQuery from "components/EndlessQuery";

const accountsQuery = gql`
  query AccountsQuery($keywords: String, $limit: Int, $offset: Int) {
    elements: accounts(keywords: $keywords, limit: $limit, offset: $offset) {
      id
      name
      email
      balance
      fee
    }
  }
`;

const brokerBalanceQuery = gql`
  query BrokerBalance {
    brokerBalance
  }
`;

export default function AccountsView() {
  const { state } = useContext(Store);

  const { data: balance } = useQuery<BrokerBalance>(brokerBalanceQuery);

  return (
    <div>
      {balance && (
        <h3>
          Total Balance:{" "}
          <CurrencyDisplay
            amount={balance.brokerBalance}
            currency={state.currency}
          />
        </h3>
      )}
      <h2>Accounts</h2>
      <ul>
        <EndlessQuery<AccountsQuery, AccountsQueryVariables>
          query={accountsQuery}
          variables={{ limit: 50 }}
        >
          {(data) => (
            <>
              {data.elements?.map((a, k) => (
                <li key={k}>
                  <br />
                  <ul>
                    <li>name: {a.name}</li>
                    <li>email: {a.email}</li>
                    <li>balance: {a.balance}</li>
                    <li>fee: {a.fee}</li>
                    <li>
                      <Link to={`/dashboard/accounts/${a.id}`}>
                        View Details
                      </Link>
                    </li>
                  </ul>
                </li>
              ))}
            </>
          )}
        </EndlessQuery>
      </ul>
    </div>
  );
}
