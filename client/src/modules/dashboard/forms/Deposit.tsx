import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Deposit, DepositVariables } from "types";
import { AutocompleteAccount, ModalFormProps } from ".";

const depositMutation = gql`
  mutation Deposit($amount: Float!, $receiver: ID!) {
    deposit(amount: $amount, receiverId: $receiver) {
      id
      amount
    }
  }
`;

export const DepositForm = (props: ModalFormProps) => {
  const [mutate] = useMutation<Deposit, DepositVariables>(depositMutation);

  const handleSubmit = async (variables: DepositVariables) => {
    // const deposit = await mutate({ variables });
    console.log({ variables });
  };

  return (
    <Formik<DepositVariables>
      initialValues={{ receiver: "", amount: 5 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <AutocompleteAccount setFieldValue={setFieldValue} />
          <Field type="number" name="amount" />
          <button type="submit">Deposit</button>
        </Form>
      )}
    </Formik>
  );
};
