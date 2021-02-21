import { gql, useMutation } from "@apollo/client";
import { Field, Form as FormikForm, Formik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import { Deposit, DepositVariables } from "types";
import { ModalFormProps, ModalForm } from "../../../components/ModalForm";
import { AutocompleteAccountField } from "./components/AutocompleteAccountField";

const depositMutation = gql`
  mutation Deposit($amount: Float!, $receiver: ID!) {
    deposit(amount: $amount, receiverId: $receiver) {
      id
      balance
    }
  }
`;

export const DepositForm = (props: ModalFormProps) => {
  const [mutate] = useMutation<Deposit, DepositVariables>(depositMutation);

  const handleSubmit = async (variables: DepositVariables) => {
    const deposit = await mutate({ variables });
    console.log({ deposit });
    props.onClose();
  };

  return (
    <Formik<DepositVariables>
      initialValues={{ receiver: "", amount: 1000 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <ModalForm
          {...props}
          size="small"
          header="Make a Deposit"
          actions={
            <>
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
                primary
                onClick={() => {
                  handleSubmit(values);
                }}
              >
                Deposit
              </Button>
            </>
          }
        >
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
        </ModalForm>
      )}
    </Formik>
  );
};
