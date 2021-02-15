import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Role {
    value: Int!
  }

  enum RoleAction {
    append
    revoque
  }

  type Transaction {
    id: ID!
    amount: Float!
    sender: User!
    receiver: User!
    created_at: String!
    updated_at: String!
  }

  type User {
    id: ID!
    name: String!
    balance: Float
    email: String
    edges: UserEdges
  }

  type UserEdges {
    income: [Transaction!]
    outcome: [Transaction!]
    roles: [Role!]
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
    register(email: String!, name: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    logout: Boolean!

    editRole(value: Int!, userId: Int!, action: RoleAction): Boolean!

    send(amount: Float!, receiverId: ID!): Transaction
    deposit(amount: Float!, receiverId: ID!): Transaction
    profit(amount: Float!): [Transaction]
  }
`;
