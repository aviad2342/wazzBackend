const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
  } = graphql;

  const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
      phone: { type: GraphQLString },
      name: { type: GraphQLString },
      avatar: { type: GraphQLString }
    }),
  });  

  module.exports = UserType;