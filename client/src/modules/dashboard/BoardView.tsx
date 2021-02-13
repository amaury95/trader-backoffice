import { gql, useQuery } from "@apollo/client";
import { AccountQuery } from "../../types";

const query = gql`
  query AccountQuery {
    session {
      balance
      edges {
        income {
          id
          amount
          created_at
        }
        outcome {
          id
          amount
          created_at
        }
        roles {
          value
        }
      }
    }
  }
`;

export default function BoardView() {
  const { data, loading } = useQuery<AccountQuery>(query);

  if (loading || !data) {
    return <div>loading...</div>;
  }

  const { session } = data;

  if (!session) {
    return <div>error loading session...</div>;
  }

  return (
    <div>
      <h3>Board</h3>
      <p>{session?.balance}</p>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
