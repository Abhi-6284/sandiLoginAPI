const { buildSchema } = require('graphql');

const schema = buildSchema(`
  scalar ID

  type User {
    id:ID!
    fullName: String!
    email: String!
    role: String!
    password: String!
  }

  input UserInput {
    fullName: String!
    email: String!
    role: String!
    password: String!
  }


  type Query {

    getUser: [User]
    getUserById(id: ID!): User!
    getUserByPara(email: String!): User!

  }

  type Mutation {

    createUser(input: UserInput): User
    updateUserById(id: ID!, input: UserInput): User!
    deleteUserById(id: ID!) : User
    
  }
`);

module.exports = {
  schema
}
