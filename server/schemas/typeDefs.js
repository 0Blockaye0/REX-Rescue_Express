const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Size {
    _id: ID
    name: String
  }

  type Dog {
    _id: ID
    name: String
    description: String
    image: String
    breed: String
    age: String
    size: Size
  }

  type Application {
    _id: ID
    applicationDate: String
    dogs: [Dog]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    applications: [Application]
  }

  // type Checkout {
  //   session: ID
  // }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    sizes: [Size]
    dogs(size: ID, name: String): [Dog]
    dog(_id: ID!): Dog
    user: User
    application(_id: ID!): Application
    // checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addApplication(dogs: [ID]!): Application
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    // updateDog(_id: ID!, quantity: Int!): Dog
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
