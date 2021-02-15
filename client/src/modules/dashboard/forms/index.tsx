import { useState } from "react";
import { DepositForm } from "./Deposit";
import { IncomeForm } from "./Income";
import Autocomplete from "react-autocomplete";
import { TransferForm } from "./Transfer";
export interface ModalFormProps {}

interface Props {
  setFieldValue(field: string, value?: string): void;
}

const items = [
  { email: "user1@host.com", id: "1" },
  { email: "user2@host.com", id: "2" },
  { email: "user3@host.com", id: "3" },
];

export const AutocompleteAccount = ({ setFieldValue }: Props) => {
  const [keywords, setKeywords] = useState("");
  return (
    <Autocomplete
      items={items}
      getItemValue={(item) => item.email}
      renderItem={(item, isHighlighted) => {
        return (
          <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
            {item.email}
          </div>
        );
      }}
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      onSelect={(val) => {
        setKeywords(val);
        setFieldValue("receiver", items.find((e) => e.email === val)?.id);
      }}
    />
  );
};

export { DepositForm, IncomeForm, TransferForm };
