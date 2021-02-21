import { DepositForm } from "./Deposit";
import { IncomeForm } from "./Income";
import { TransferForm } from "./Transfer";

export interface FormProps {
  open: boolean;
  onClose: () => void;
}

export { DepositForm, IncomeForm, TransferForm };
