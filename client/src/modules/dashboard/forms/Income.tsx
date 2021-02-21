import { gql, useMutation } from "@apollo/client";
import { IncomeVariables, Income } from "types";
import { Form as FormikForm, Formik } from "formik";
import { Button, Form, Label, Modal } from "semantic-ui-react";
import { FormProps } from ".";

const incomeMutation = gql`
  mutation Income($amount: Float!) {
    income(amount: $amount) {
      id
      balance
    }
  }
`;

export const IncomeForm = (props: FormProps) => {
  const [mutate] = useMutation<Income, IncomeVariables>(incomeMutation);

  const handleSubmit = async (variables: IncomeVariables) => {
    const transaction = await mutate({ variables });
    console.log({ transaction });
  };

  return (
    <Formik<IncomeVariables>
      initialValues={{ amount: 1000 }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Modal
          {...props}
          title="Add Income"
          size="mini"
          dimmer="blurring"
          closeOnDimmerClick={false}
        >
          <Modal.Header>Add Income</Modal.Header>
          <Modal.Content>
            <FormikForm className="ui form">
              <Form.Group widths="equal">
                <Form.Input
                  label="Amount"
                  labelPosition="right"
                  type="text"
                  placeholder="Amount"
                >
                  <Label basic>$</Label>
                  <input
                    type="number"
                    min="0"
                    value={values.amount}
                    onChange={(e) =>
                      setFieldValue("amount", parseFloat(e.target.value))
                    }
                  />
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
