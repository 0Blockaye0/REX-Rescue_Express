const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
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
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    dogs: [Dog]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  
  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    dogs(category: ID, name: String): [Dog]
    dog(_id: ID!): Dog
    user: User
    order(_id: ID!): Order
    checkout(dogs: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(dogs: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;



//    updateDog(_id: ID!, quantity: Int!): Dog
