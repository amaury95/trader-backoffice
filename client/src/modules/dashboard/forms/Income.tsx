import { TextInput } from "carbon-components-react";
import React from "react";
import { ModalForm, ModalFormProps } from ".";

export const IncomeForm = (props: ModalFormProps) => {
  const handleSubmit = () => {
    console.log("form submitted");
  };
  return (
    <ModalForm
      modalHeading="Income"
      aria-label="income-form-modal"
      onRequestSubmit={handleSubmit}
      {...props}
    >
      <TextInput
        id="receiver-input"
        labelText="Income"
        placeholder="Enter text..."
        style={{ marginBottom: "1rem" }}
      />
    </ModalForm>
  );
};
