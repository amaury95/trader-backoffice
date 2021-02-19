import { gql, useMutation, useQuery } from "@apollo/client";
import { WithRoles } from "components/WithRoles";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import {
  AccountQuery,
  AccountQueryVariables,
  FeeMutation,
  FeeMutationVariables,
} from "types";

const accountQuery = gql`
  query AccountQuery($id: ID!) {
    account(id: $id) {
      id
      name
      balance
      fee
      email
    }
  }
`;

const feeMutation = gql`
  mutation FeeMutation($id: ID!, $fee: Float!) {
    fee(fee: $fee, userId: $id) {
      id
      name
      balance
      fee
      email
    }
  }
`;

export default function AccountView() {
  const { id } = useParams<any>();

  const { data, loading } = useQuery<AccountQuery, AccountQueryVariables>(
    accountQuery,
    {
      variables: { id },
    }
  );

  const [mutate] = useMutation<FeeMutation, FeeMutationVariables>(feeMutation);

  const handleSubmit = async (variables: FeeMutationVariables) => {
    const fee = await mutate({ variables });
    console.log({ fee });
  };

  if (loading || !data) {
    return <div>loading...</div>;
  }

  if (!data.account) {
    return <div>error loading user</div>;
  }

  const { name, email, balance, fee } = data.account;

  return (
    <div>
      <ul>
        <li>name: {name}</li>
        <li>email: {email}</li>
        <li>balance: {balance}</li>
        <li>fee: {fee}</li>
      </ul>

      <WithRoles roles={["admin"]}>
        <Formik<FeeMutationVariables>
          initialValues={{ id, fee }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field type="number" name="fee" min="0" max="1" step="0.01" />
            <button type="submit">Update Fee</button>
          </Form>
        </Formik>
      </WithRoles>
    </div>
  );
}
