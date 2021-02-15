import { gql, useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React from "react";
import { ProfitVariables, Profit } from "types";
import { ModalFormProps } from ".";

const incomeMutation = gql`
  mutation Profit($amount: Float!) {
    profit(amount: $amount) {
      id
      amount
      sender {
        name
      }
      receiver {
        name
      }
    }
  }
`;

export const IncomeForm = (props: ModalFormProps) => {
  const [mutate] = useMutation<Profit, ProfitVariables>(incomeMutation);

  const handleSubmit = async (variables: ProfitVariables) => {
    const transaction = await mutate({ variables });
    console.log({ transaction });
  };

  return (
    <Formik<ProfitVariables>
      initialValues={{ amount: 5 }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field type="number" name="amount" />
        <button type="submit">Income</button>
      </Form>
    </Formik>
  );
};
