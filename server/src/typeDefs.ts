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
    sender: User!
    receiver: User!
  }

  type User {
    id: ID!
    name: String!
    balance: Float!
    email: String!
    edges: UserEdges!
  }

  type UserEdges {
    income: [Transaction!]!
    outcome: [Transaction!]!
  }

  type UserInfo {
    id: ID!
    name: String!
  }

  type Query {
    session: User

    users(keywords: String, limit: Int, offset: Int): [UserInfo!]

    accounts(keywords: String, limit: Int, offset: Int): [User!]
    account(id: ID!): User

    transactions(limit: Int, offset: Int): [Transaction!]
    transaction(id: ID!): Transaction
  }

  type Mutation {
    send(amount: Float!, receiverId: ID!): Transaction
    deposit(amount: Float!, receiverId: ID!): Transaction
    income(amount: Float!): [Transaction!]
  }
`;
