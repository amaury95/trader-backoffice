import { useState } from "react";
import { DepositForm } from "./Deposit";
import { IncomeForm } from "./Income";
import Autocomplete from "react-autocomplete";
import { TransferForm } from "./Transfer";
import { gql, useQuery } from "@apollo/client";
import { FilterUsers, FilterUsersVariables } from "types";
import { useKeycloak } from "@react-keycloak/web";

interface Props {
  name: string;
  excludeCurrentUser?: boolean;
  setFieldValue(field: string, value?: string): void;
}

const usersFilter = gql`
  query FilterUsers($keywords: String) {
    users(keywords: $keywords) {
      id
      name
    }
  }
`;

export const AutocompleteAccountField = ({
  name: field,
  setFieldValue,
  excludeCurrentUser,
}: Props) => {
  const { keycloak } = useKeycloak();
  const [keywords, setKeywords] = useState("");

  const { data } = useQuery<FilterUsers, FilterUsersVariables>(usersFilter, {
    variables: { keywords },
  });

  let items = data?.users || [];

  if (excludeCurrentUser) {
    items = items.filter((u) => u.id !== keycloak.subject);
  }

  return (
    <Autocomplete
      items={items}
      getItemValue={(item) => item.name}
      renderItem={(item, isHighlighted) => {
        return (
          <div
            key={item.id}
            style={{ background: isHighlighted ? "lightgray" : "white" }}
          >
            {item.name}
          </div>
        );
      }}
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      onSelect={(val) => {
        setKeywords(val);
        setFieldValue(field, items.find((e) => e.name === val)?.id);
      }}
    />
  );
};

export { DepositForm, IncomeForm, TransferForm };
