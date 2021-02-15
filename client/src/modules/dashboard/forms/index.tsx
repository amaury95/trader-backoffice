import { useState } from "react";
import { DepositForm } from "./Deposit";
import { IncomeForm } from "./Income";
import Autocomplete from "react-autocomplete";
import { TransferForm } from "./Transfer";
import { gql, useQuery } from "@apollo/client";
import { FilterAccounts, FilterAccountsVariables } from "types";

interface Props {
  name: string;
  setFieldValue(field: string, value?: string): void;
}

const accountsFilter = gql`
  query FilterAccounts($keywords: String) {
    accounts(keywords: $keywords) {
      id
      name
      email
      balance
    }
  }
`;

export const AutocompleteAccountField = ({
  name: field,
  setFieldValue,
}: Props) => {
  const [keywords, setKeywords] = useState("");

  const { data } = useQuery<FilterAccounts, FilterAccountsVariables>(
    accountsFilter,
    { variables: { keywords } }
  );

  const items = data?.accounts || [];

  return (
    <Autocomplete
      items={items}
      getItemValue={(item) => item.email}
      renderItem={(item, isHighlighted) => {
        return (
          <div
            key={item.id}
            style={{ background: isHighlighted ? "lightgray" : "white" }}
          >
            {item.email}
          </div>
        );
      }}
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      onSelect={(val) => {
        setKeywords(val);
        setFieldValue(field, items.find((e) => e.email === val)?.id);
      }}
    />
  );
};

export { DepositForm, IncomeForm, TransferForm };
