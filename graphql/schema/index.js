const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
  _id: ID!
  phone: String!
  name: String!
  avatar: String!
}

type AuthData {
  userId: ID!
  phone: String!
  name: String!
  avatar: String!
  token: String!
  tokenExpiration: Int!
}

type Chat {
    _id: ID!
    id: String!
    messages: [Message!]
}

type Message {
  _id: ID!
  from: User!
  to: User!
  date: String!
  body: String!
}

input ChatInput {
  id: String!
}

input MessageInput {
  from: UserInput!
  to: UserInput!
  date: String!
  body: String!
}

input NewMessageInput {
  chatId: ID!
  from: String!
  to: String!
  date: String!
  body: String!
}

input UserInput {
  phone: String!
  name: String!
  avatar: String!
}

type RootQuery {
    chats: [Chat!]!
    messages: [Message!]!
    users: [User!]!
    login(phone: String!, userName: String!): AuthData!
}

type RootMutation {
    createMessage(messageInput: MessageInput): Message
    createUser(userInput: UserInput): User
    createChat(chatInput: ChatInput): Chat
    chat(chatId: String!): Chat
    message(mesageId: String!): Message!
    user(userPhone: String!): User!
    newMessage(newMessageInput: NewMessageInput): Message!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);