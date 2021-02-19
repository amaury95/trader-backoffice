import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Deposit, DepositVariables } from "types";
import { AutocompleteAccountField } from ".";

const depositMutation = gql`
  mutation Deposit($amount: Float!, $receiver: ID!) {
    deposit(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const DepositForm = () => {
  const [mutate] = useMutation<Deposit, DepositVariables>(depositMutation);

  const handleSubmit = async (variables: DepositVariables) => {
    const deposit = await mutate({ variables });
    console.log({ deposit });
  };

  return (
    <Formik<DepositVariables>
      initialValues={{ receiver: "", amount: 5 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <AutocompleteAccountField
            name="receiver"
            setFieldValue={setFieldValue}
          />
          <Field type="number" name="amount" />
          <button type="submit">Deposit</button>
        </Form>
      )}
    </Formik>
  );
};
