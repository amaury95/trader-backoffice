import { Modal } from "carbon-components-react";
import { FunctionComponent } from "react";
import { DepositForm } from "./Deposit";
import { IncomeForm } from "./Income";
import { TransferForm } from "./Transfer";

export interface ModalFormProps {
  visible?: boolean;
  setVisivility(value: boolean): void;
}

export interface FormProps {
  modalHeading?: string;
  selectorPrimaryFocus?: string;
  "aria-label"?: string;
  onRequestSubmit(): void;
}

export const ModalForm: FunctionComponent<ModalFormProps & FormProps> = (
  props
) => {
  const { children, setVisivility, visible, ...modalProps } = props;
  const handleClose = () => setVisivility(false);
  return (
    <Modal
      open={visible}
      onRequestClose={handleClose}
      hasForm
      primaryButtonText="Submit"
      secondaryButtonText="Cancel"
      {...modalProps}
    >
      {children}
    </Modal>
  );
};

export { DepositForm, IncomeForm, TransferForm };
