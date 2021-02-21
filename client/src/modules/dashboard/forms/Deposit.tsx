import { gql, useMutation } from "@apollo/client";
import { Field, Form as FormikForm, Formik } from "formik";
import { Button, Form, Label, Modal } from "semantic-ui-react";
import { Deposit, DepositVariables } from "types";
import { FormProps } from ".";
import { AutocompleteAccountField } from "./components/AutocompleteAccountField";

const depositMutation = gql`
  mutation Deposit($amount: Float!, $receiver: ID!) {
    deposit(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const DepositForm = (props: FormProps) => {
  const [mutate] = useMutation<Deposit, DepositVariables>(depositMutation);

  const handleSubmit = async (variables: DepositVariables) => {
    const deposit = await mutate({ variables });
    console.log({ deposit });
    props.onClose();
  };

  return (
    <Formik<DepositVariables>
      initialValues={{ receiver: "", amount: 0 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Modal
          {...props}
          title="Make a Deposit"
          size="small"
          dimmer="blurring"
          closeOnDimmerClick={false}
        >
          <Modal.Header>Make a Deposit</Modal.Header>
          <Modal.Content>
            <FormikForm className="ui form">
              <Form.Group widths="equal">
                <AutocompleteAccountField
                  name="deposit"
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
              secondary
              onClick={() => {
                handleSubmit({
                  receiver: values.receiver,
                  amount: -values.amount,
                });
              }}
            >
              Withdraw
            </Button>

            <Button
              onClick={() => {
                handleSubmit(values);
              }}
            >
              Deposit
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
};
