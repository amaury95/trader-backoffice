import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Send, SendVariables } from "types";
import { ModalFormProps } from ".";

const transferMutation = gql`
  mutation Send($amount: Float!, $receiver: ID!) {
    send(amount: $amount, receiverId: $receiver) {
      id
      amount
      created_at
      sender {
        name
      }
      receiver {
        name
      }
    }
  }
`;

export const TransferForm = (props: ModalFormProps) => {
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
      <Form>
        <Field type="hidden" name="receiver" />
        {/* <Field type="text" name="receiverName" placeholder="Receiver Name" /> */}
        <Field type="number" name="amount" />
        <button type="submit">Transfer</button>
      </Form>
    </Formik>
  );
};
