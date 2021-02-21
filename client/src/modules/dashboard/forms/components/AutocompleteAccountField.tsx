import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { FilterUsers, FilterUsersVariables } from "types";
import { useKeycloak } from "@react-keycloak/web";
import Select from "react-select";

interface Props {
  name: string;
  excludeCurrentUser?: boolean;
  onChange: (value: string) => void;
}

const usersFilter = gql`
  query FilterUsers($keywords: String) {
    users(keywords: $keywords) {
      id
      name
    }
  }
`;

export const AutocompleteAccountField = (props: Props) => {
  const { keycloak } = useKeycloak();
  const [keywords, setKeywords] = useState("");

  const { data, loading } = useQuery<FilterUsers, FilterUsersVariables>(
    usersFilter,
    {
      variables: { keywords },
    }
  );

  let items = data?.users || [];

  if (props.excludeCurrentUser) {
    items = items.filter((u) => u.id !== keycloak.subject);
  }

  const handleChange = (value: string) => setKeywords(value);
  const handleSelect = (data: { label: string; value: string } | null) => {
    if (data === null) return;

    console.log({ data });

    props.onChange(data.value);
  };

  return (
    <div className="field">
      <label>Select user</label>
      <Select
        styles={{
          control: (parent) => ({
            ...parent,
            borderColor: "rgba(34, 36, 38, 0.15)",
            width: "100%",
          }),
        }}
        className="ui fluid input"
        classNamePrefix={props.name}
        isLoading={loading}
        isClearable
        options={items.map(({ id: value, name: label }) => ({
          value,
          label,
        }))}
        onChange={(value) => handleSelect(value)}
        onInputChange={(label) => handleChange(label)}
      />
    </div>
  );
};
