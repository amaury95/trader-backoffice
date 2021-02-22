import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AccountQuery, AccountQueryVariables } from "types";
import ProfileView from "./components/profile/Profile";

const accountQuery = gql`
  query AccountQuery($id: ID!) {
    account(id: $id) {
      id
      username
      name
      balance
      fee
      avatar
      email
    }
  }
`;

export default function AccountView() {
  const { id } = useParams<any>();
  const { data, loading } = useQuery<AccountQuery, AccountQueryVariables>(
    accountQuery,
    { variables: { id } }
  );

  if (loading || !data?.account) {
    return <div>loading...</div>;
  }

  return <ProfileView account={data.account} />;
}
