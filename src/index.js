import { GraphQLServer } from "graphql-yoga";

import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
// 5 Scalar types - a type stores a single value
// string, boolean, int,float, ID
// custom types - a type that can be objects,arrays,scalar
// input type can only have scalar valuess
// Type definitions (schema)

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("server is up!");
});
