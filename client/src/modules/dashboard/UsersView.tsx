import { gql } from "@apollo/client";
import EndlessQuery from "components/EndlessQuery";
import { Users, UsersVariables } from "types";

const usersQuery = gql`
  query Users($keywords: String, $limit: Int, $offset: Int) {
    elements: users(keywords: $keywords, limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

export default function UsersView() {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <EndlessQuery<Users, UsersVariables>
          query={usersQuery}
          variables={{ limit: 50 }}
        >
          {(users) => (
            <>
              {users.elements.map((u) => (
                <li key={u.id}>name: Name</li>
              ))}
            </>
          )}
        </EndlessQuery>
      </ul>
    </div>
  );
}
