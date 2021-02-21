import { gql, useMutation } from "@apollo/client";
import { Field, Form as FormikForm, Formik } from "formik";
import { Button, Form, Label, Modal } from "semantic-ui-react";
import { Send, SendVariables } from "types";
import { FormProps } from ".";
import { AutocompleteAccountField } from "./components/AutocompleteAccountField";

const transferMutation = gql`
  mutation Send($amount: Float!, $receiver: ID!) {
    send(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const TransferForm = (props: FormProps) => {
  const [mutate] = useMutation<Send, SendVariables>(transferMutation);

  const handleSubmit = async (variables: SendVariables) => {
    const transaction = await mutate({ variables });
    console.log({ transaction });
  };

  return (
    <Formik<SendVariables>
      initialValues={{ receiver: "", amount: 0 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Modal
          {...props}
          title="Make a Transfer"
          size="small"
          dimmer="blurring"
          closeOnDimmerClick={false}
        >
          <Modal.Header>Make a Transfer</Modal.Header>
          <Modal.Content>
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
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={props.onClose}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                handleSubmit(values);
              }}
            >
              Send
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
};
