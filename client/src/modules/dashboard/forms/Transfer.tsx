import { TextInput } from "carbon-components-react";
import { ModalForm, ModalFormProps } from ".";

export const TransferForm = (props: ModalFormProps) => {
  const handleSubmit = () => {
    console.log("form submitted");
  };
  return (
    <ModalForm
      modalHeading="Transfer"
      aria-label="transfer-form-modal"
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
