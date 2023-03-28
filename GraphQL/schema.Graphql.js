const { buildSchema } = require('graphql');

module.exports = schema = buildSchema(`
  scalar ID

  type Admin {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    custName: String!
    carName: String!
    carType: String!
    carNumber: String!
    carModel: String!
    additionalService: String!
    actions: String!
    emergencyType: String!
    fuelType: String!
    serviceType: String!
    status: String!
    totalPrice: String!
  }

  input AdminInput {
    name: String!
    email: String!
    password: String
  }

  input UserInput {
    custName: String!
    carName: String!
    carType: String!
    carNumber: String!
    carModel: String!
    additionalService: String!
    actions: String!
    emergencyType: String!
    fuelType: String!
    serviceType: String!
    status: String!
    totalPrice: String!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getUserByPara(email: String!): User
    
    getAdmins: [Admin]
    getAdminById(id: ID!): Admin
    getAdminByPara(email: String!): Admin
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUserById(id: ID!, input: UserInput): User!
    deleteUserById(id: ID!): User

    createAdmin(input: AdminInput): Admin
    updateAdminById(id: ID!, input: AdminInput): Admin!
    deleteAdminById(id: ID!): Admin
  }
`);
