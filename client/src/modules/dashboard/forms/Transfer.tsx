import { gql, useMutation } from "@apollo/client";
import { Field, Form as FormikForm, Formik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import { Send, SendVariables } from "types";
import { ModalFormProps, ModalForm } from "../../../components/ModalForm";
import { AutocompleteAccountField } from "./components/AutocompleteAccountField";

const transferMutation = gql`
  mutation Send($amount: Float!, $receiver: ID!) {
    send(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const TransferForm = (props: ModalFormProps) => {
  const [mutate] = useMutation<Send, SendVariables>(transferMutation);

  const handleSubmit = async (variables: SendVariables) => {
    const transaction = await mutate({ variables });
    console.log({ transaction });
    props.onClose();
  };

  return (
    <Formik<SendVariables>
      initialValues={{ receiver: "", amount: 0 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <ModalForm
          {...props}
          size="small"
          header="Make a Transaction"
          actions={
            <Button
              primary
              onClick={() => {
                handleSubmit(values);
              }}
            >
              Send
            </Button>
          }
        >
          <FormikForm className="ui form">
            <Form.Group widths="equal">
              <AutocompleteAccountField
                name="deposit"
                excludeCurrentUser
                onChange={(value) => setFieldValue("receiver", value)}
              />
              <Form.Input
                label="Amount"
                labelPosition="right"
                type="text"
                placeholder="Amount"
              >
                <Label basic>$</Label>
                <Field type="number" name="amount" min="0" />
                <Label>USD</Label>
              </Form.Input>
            </Form.Group>
          </FormikForm>
        </ModalForm>
      )}
    </Formik>
  );
};
