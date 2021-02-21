import { gql, useMutation } from "@apollo/client";
import { IncomeVariables, Income } from "types";
import { Field, Form as FormikForm, Formik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import { FormProps, ModalForm } from ".";

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
    props.onClose();
  };

  return (
    <Formik<IncomeVariables>
      initialValues={{ amount: 1000 }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <ModalForm
          {...props}
          size="mini"
          header="Add Income"
          actions={
            <>
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
