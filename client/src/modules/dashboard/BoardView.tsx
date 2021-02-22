import { gql, useQuery } from "@apollo/client";
import { SessionQuery } from "types";
import ProfileView from "./components/profile/Profile";

const sessionQuery = gql`
  query SessionQuery {
    account: session {
      id
      name
      username
      balance
      fee
      avatar
      email
    }
  }
`;

export default function BoardView() {
  const { data, loading, error } = useQuery<SessionQuery>(sessionQuery);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log({ error });

    return <p>{error.message}</p>;
  }

  if (!data?.account) {
    return <p>No account</p>;
  }

  return <ProfileView account={data.account} />;
}
