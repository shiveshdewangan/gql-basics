const { default: Axios } = require("axios");
const { GraphQLServer } = require("graphql-yoga");
const { Query, Mutation, Post, User, Picture } = require("./graphql/resolvers");

const server = new GraphQLServer({
  typeDefs: `./src/graphql/schema.graphql`,
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Picture,
  },
});

server.start(() => {
  console.log("Server is running");
});
