import { TextInput } from "carbon-components-react";
import React from "react";
import { ModalForm, ModalFormProps } from ".";

export const DepositForm = (props: ModalFormProps) => {
  const handleSubmit = () => {
    console.log("form submitted");
  };
  return (
    <ModalForm
      modalHeading="Deposit"
      aria-label="deposit-form-modal"
      onRequestSubmit={handleSubmit}
      {...props}
    >
      <TextInput
        id="receiver-input"
        labelText="Receiver Name"
        placeholder="Enter text..."
        style={{ marginBottom: "1rem" }}
      />
      <TextInput
        id="amount-input"
        labelText="Amount"
        placeholder="Enter text..."
      />
    </ModalForm>
  );
};
