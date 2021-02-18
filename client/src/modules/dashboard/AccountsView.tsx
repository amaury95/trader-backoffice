import { gql, useQuery } from "@apollo/client";
import { AccountsQuery } from "types";
import React from "react";
import { Link } from "react-router-dom";

const accountsQuery = gql`
  query AccountsQuery {
    accounts {
      id
      name
      email
      balance
      fee
    }
  }
`;

export default function AccountsView() {
  const { data, loading } = useQuery<AccountsQuery>(accountsQuery);

  if (!data || !data.accounts || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {data.accounts.map((a, k) => (
          <li key={k}>
            <ul>
              <li>{a.id}</li>
              <li>{a.name}</li>
              <li>{a.email}</li>
              <li>{a.balance}</li>
              <li>{a.fee}</li>
              <li>
                <Link to={`/dashboard/accounts/${a.id}`}>View Details</Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
