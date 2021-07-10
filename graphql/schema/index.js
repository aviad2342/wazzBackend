const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Chat {
    _id: ID!
    from: User!
    to: User!
    messages: [Message!]

}

type Message {
  _id: ID!
  from: User!
  to: User!
  date: String!
  body: String!

}

type User {
  _id: ID!
  phone: String!
  name: String!
  avatar: String!
}

input ChatInput {
  from: User!
  to: User!
  messages: [Message!]
}

input MessageInput {
  from: User!
  to: User!
  date: String!
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
}

type RootMutation {
    createEvent(messageInput: MessageInput): Message
    createUser(userInput: UserInput): User
    createChat(chatInput: ChatInput): Chat
    newMessage(chatId: ID!): Message!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);