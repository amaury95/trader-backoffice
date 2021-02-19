import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Send, SendVariables } from "types";
import { AutocompleteAccountField } from ".";

const transferMutation = gql`
  mutation Send($amount: Float!, $receiver: ID!) {
    send(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const TransferForm = () => {
  const [mutate] = useMutation<Send, SendVariables>(transferMutation);

  const handleSubmit = async (variables: SendVariables) => {
    const transaction = await mutate({ variables });
    console.log({ transaction });
  };

  return (
    <Formik<SendVariables>
      initialValues={{ receiver: "", amount: 5 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <AutocompleteAccountField
            name="receiver"
            excludeCurrentUser
            setFieldValue={setFieldValue}
          />
          <Field type="number" name="amount" />
          <button type="submit">Transfer</button>
        </Form>
      )}
    </Formik>
  );
};
