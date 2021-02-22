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
  username: string;
  name: string;
  balance: number;
  fee: number;
  avatar: string | null;
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
// GraphQL query operation: SessionQuery
// ====================================================

export interface SessionQuery_account {
  __typename: "User";
  id: string;
  name: string;
  username: string;
  balance: number;
  fee: number;
  avatar: string | null;
  email: string;
}

export interface SessionQuery {
  account: SessionQuery_account | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProfileMutation
// ====================================================

export interface ProfileMutation_profile {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  fee: number;
}

export interface ProfileMutation {
  profile: ProfileMutation_profile | null;
}

export interface ProfileMutationVariables {
  id: string;
  name?: string | null;
  avatar?: string | null;
  fee?: number | null;
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
  username: string;
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
// GraphQL mutation operation: Deposit
// ====================================================

export interface Deposit_deposit {
  __typename: "User";
  id: string;
  balance: number;
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
  __typename: "User";
  id: string;
  balance: number;
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
// GraphQL mutation operation: Send
// ====================================================

export interface Send_send {
  __typename: "User";
  id: string;
  balance: number;
}

export interface Send {
  send: Send_send[] | null;
}

export interface SendVariables {
  amount: number;
  receiver: string;
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
