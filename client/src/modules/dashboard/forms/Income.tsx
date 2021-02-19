import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React from "react";
import { IncomeVariables, Income } from "types";

const incomeMutation = gql`
  mutation Income($amount: Float!) {
    income(amount: $amount) {
      id
      balance
    }
  }
`;

export const IncomeForm = () => {
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
      <Form>
        <Field type="number" name="amount" />
        <button type="submit">Income</button>
      </Form>
    </Formik>
  );
};
