import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum TransactionType {
    income
    deposit
    transaction
  }

  type Transaction {
    id: ID!
    amount: Float!
    type: TransactionType!
    createdAt: String!
    updatedAt: String!
    edges: TransactionEdges!
  }

  type TransactionEdges {
    sender: UserInfo!
    receiver: UserInfo!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    avatar: String
    balance: Float!
    fee: Float!
    edges: UserEdges!
  }

  type UserEdges {
    income: [Transaction!]!
    outcome: [Transaction!]!
  }

  type UserInfo {
    id: ID!
    username: String!
    name: String!
    avatar: String
  }

  type Query {
    session: User

    users(keywords: String, limit: Int, offset: Int): [UserInfo!]!

    accounts(keywords: String, limit: Int, offset: Int): [User!]
    account(id: ID!): User

    transactions(limit: Int, offset: Int): [Transaction!]
    transaction(id: ID!): Transaction

    brokerBalance: Float
    totalAccounts: Int
  }

  type Mutation {
    profile(id: ID!, name: String, avatar: String, fee: Float): User

    send(amount: Float!, receiverId: ID!): [User!]
    deposit(amount: Float!, receiverId: ID!): User
    income(amount: Float!): [User!]
  }
`;
