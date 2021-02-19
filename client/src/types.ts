/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountsQuery
// ====================================================

export interface AccountsQuery_elements {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  balance: number;
  fee: number;
}

export interface AccountsQuery {
  elements: AccountsQuery_elements[] | null;
}

export interface AccountsQueryVariables {
  keywords?: string | null;
  limit?: number | null;
  offset?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BrokerBalance
// ====================================================

export interface BrokerBalance {
  brokerBalance: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountQuery
// ====================================================

export interface AccountQuery_account {
  __typename: "User";
  id: string;
  name: string;
  balance: number;
  fee: number;
  email: string;
}

export interface AccountQuery {
  account: AccountQuery_account | null;
}

export interface AccountQueryVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeeMutation
// ====================================================

export interface FeeMutation_fee {
  __typename: "User";
  id: string;
  name: string;
  balance: number;
  fee: number;
  email: string;
}

export interface FeeMutation {
  fee: FeeMutation_fee | null;
}

export interface FeeMutationVariables {
  id: string;
  fee: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Session
// ====================================================

export interface Session_session_edges_income {
  __typename: "Transaction";
  amount: number;
  createdAt: string;
}

export interface Session_session_edges_outcome {
  __typename: "Transaction";
  amount: number;
  createdAt: string;
}

export interface Session_session_edges {
  __typename: "UserEdges";
  income: Session_session_edges_income[];
  outcome: Session_session_edges_outcome[];
}

export interface Session_session {
  __typename: "User";
  balance: number;
  edges: Session_session_edges;
}

export interface Session {
  session: Session_session | null;
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
  createdAt: string;
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
// GraphQL mutation operation: Income
// ====================================================

export interface Income_income {
  __typename: "Transaction";
  id: string;
  amount: number;
  createdAt: string;
}

export interface Income {
  income: Income_income[] | null;
}

export interface IncomeVariables {
  amount: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilterUsers
// ====================================================

export interface FilterUsers_users {
  __typename: "UserInfo";
  id: string;
  name: string;
}

export interface FilterUsers {
  users: FilterUsers_users[];
}

export interface FilterUsersVariables {
  keywords?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Send
// ====================================================

export interface Send_send {
  __typename: "Transaction";
  id: string;
  amount: number;
  createdAt: string;
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
// GraphQL query operation: Users
// ====================================================

export interface Users_elements {
  __typename: "UserInfo";
  id: string;
  name: string;
}

export interface Users {
  elements: Users_elements[];
}

export interface UsersVariables {
  keywords?: string | null;
  limit?: number | null;
  offset?: number | null;
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
