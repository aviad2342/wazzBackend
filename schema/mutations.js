const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const ChatType = require('./chatType');
const MessageType = require("./messageType");
const UserType = require("./userType");
const Chat = require("../models/chat");
const User = require("../models/chat");
const Message = require("../models/chat");

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChat: {
      type: ChatType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Song({ title })).save()
      }
    }
  }
});

module.exports = mutation;
