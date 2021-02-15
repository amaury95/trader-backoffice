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
  roles: SessionQuery_session_edges_roles[] | null;
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
// GraphQL query operation: AccountsQuery
// ====================================================

export interface AccountsQuery_accounts {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  balance: number | null;
}

export interface AccountsQuery {
  accounts: AccountsQuery_accounts[] | null;
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
  income: AccountQuery_session_edges_income[] | null;
  outcome: AccountQuery_session_edges_outcome[] | null;
  roles: AccountQuery_session_edges_roles[] | null;
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
// GraphQL mutation operation: Deposit
// ====================================================

export interface Deposit_deposit {
  __typename: "Transaction";
  id: string;
  amount: number;
}

export interface Deposit {
  deposit: Deposit_deposit | null;
}

export interface DepositVariables {
  amount: number;
  receiver: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Profit
// ====================================================

export interface Profit_profit_sender {
  __typename: "User";
  name: string;
}

export interface Profit_profit_receiver {
  __typename: "User";
  name: string;
}

export interface Profit_profit {
  __typename: "Transaction";
  id: string;
  amount: number;
  sender: Profit_profit_sender;
  receiver: Profit_profit_receiver;
}

export interface Profit {
  profit: (Profit_profit | null)[] | null;
}

export interface ProfitVariables {
  amount: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Send
// ====================================================

export interface Send_send_sender {
  __typename: "User";
  name: string;
}

export interface Send_send_receiver {
  __typename: "User";
  name: string;
}

export interface Send_send {
  __typename: "Transaction";
  id: string;
  amount: number;
  created_at: string;
  sender: Send_send_sender;
  receiver: Send_send_receiver;
}

export interface Send {
  send: Send_send | null;
}

export interface SendVariables {
  amount: number;
  receiver: string;
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
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_session_edges_roles {
  __typename: "Role";
  value: number;
}

export interface LoginMutation_session_edges {
  __typename: "UserEdges";
  roles: LoginMutation_session_edges_roles[] | null;
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
