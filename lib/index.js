"use strict";

var _graphqlYoga = require("graphql-yoga");

// 5 Scalar types - a type stores a single value
// string, boolean, int,float, ID
// object/array types - a type that stores more than a single value
// Type definitions (schema)
var typeDefs = "\ntype Query{\n  title: String!\n  price: Float!\n  releaseYear: Int\n  rating: Float\n  inStock: Boolean!\n}\n"; // Resolvers

var resolvers = {
  Query: {
    title: function title() {
      return "Kingdom Hearts3";
    },
    price: function price() {
      return 59.99;
    },
    releaseYear: function releaseYear() {
      return 2019;
    },
    rating: function rating() {
      return 9.9;
    },
    inStock: function inStock() {
      return true;
    }
  }
};
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.start(function () {
  console.log("server is up!");
});