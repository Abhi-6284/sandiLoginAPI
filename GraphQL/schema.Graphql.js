const { buildSchema } = require('graphql');

module.exports = schema = buildSchema(`
  scalar ID

  type LogCredential{
    id: ID!
    email: String!
    userIp: String!
  }

  type Admin {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Service {
    id: ID!
    Date: String!
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

  type Mechanic {
    id: ID!
    mechanicName: String!
    email: String!
    phone: String!
    service: String!
  }

  input LogCredentialInput{
    email: String!
    userIp: String!
  }

  input AdminInput {
    name: String!
    email: String!
    password: String
  }

  input ServiceInput {
    Date: String!
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

  input mechanicInput {
    mechanicName: String!
    email: String!
    phone: String!
    service: String!
  }

  type Query {
    getServices: [Service]
    getServiceById(id: ID!): Service
    getServiceByPara(email: String!): Service
    
    getAdmins: [Admin]
    getAdminById(id: ID!): Admin
    getAdminByPara(email: String!): Admin
    
    getMechanic: [Mechanic]
    getMechanicById(id: ID!): Mechanic
    getMechanicByPara(email: String!): Mechanic
  }

  type Mutation {

    createLogCredential(input: LogCredentialInput): LogCredential

    createService(input: ServiceInput): Service
    updateServiceById(id: ID!, input: ServiceInput): Service!
    deleteServiceById(id: ID!): Service

    createAdmin(input: AdminInput): Admin
    updateAdminById(id: ID!, input: AdminInput): Admin!
    deleteAdminById(id: ID!): Admin

    createMechanic(input: mechanicInput): Mechanic
    deleteMechanicById(id: ID!) : Mechanic
  }
`);
