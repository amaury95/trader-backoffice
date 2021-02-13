/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SessionQuery
// ====================================================

export interface SessionQuery_session_edges_roles {
  __typename: "Role";
  value: number;
}

export interface SessionQuery_session_edges {
  __typename: "UserEdges";
  roles: (SessionQuery_session_edges_roles | null)[];
}

export interface SessionQuery_session {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  edges: SessionQuery_session_edges | null;
}

export interface SessionQuery {
  session: SessionQuery_session | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountQuery
// ====================================================

export interface AccountQuery_session_edges_income {
  __typename: "Transaction";
  id: string;
  amount: number;
  created_at: string;
}

export interface AccountQuery_session_edges_outcome {
  __typename: "Transaction";
  id: string;
  amount: number;
  created_at: string;
}

export interface AccountQuery_session_edges_roles {
  __typename: "Role";
  value: number;
}

export interface AccountQuery_session_edges {
  __typename: "UserEdges";
  income: (AccountQuery_session_edges_income | null)[];
  outcome: (AccountQuery_session_edges_outcome | null)[];
  roles: (AccountQuery_session_edges_roles | null)[];
}

export interface AccountQuery_session {
  __typename: "User";
  balance: number | null;
  edges: AccountQuery_session_edges | null;
}

export interface AccountQuery {
  session: AccountQuery_session | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_session_edges_roles {
  __typename: "Role";
  value: number;
}

export interface LoginMutation_session_edges {
  __typename: "UserEdges";
  roles: (LoginMutation_session_edges_roles | null)[];
}

export interface LoginMutation_session {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  edges: LoginMutation_session_edges | null;
}

export interface LoginMutation {
  session: LoginMutation_session | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  email: string;
  name: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
