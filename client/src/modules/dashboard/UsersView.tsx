import { WithRoles } from "authentication/WithRoles";
import React from "react";

export default function UsersView() {
  return (
    <WithRoles roles={[2, 3]} fallback="/dashboard">
      <h2>Users</h2>
    </WithRoles>
  );
}
