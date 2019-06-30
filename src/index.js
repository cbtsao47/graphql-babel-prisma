import { GraphQLServer } from "graphql-yoga";
// 5 Scalar types - a type stores a single value
// string, boolean, int,float, ID
// custom types - a type that can be objects,arrays,scalar
//
// Type definitions (schema)
const typeDefs = `
type Query{
  greeting(name: String,job: String):String!
  user:User!
  post:Post!
  add(numbers:[Int]!):Float!
  grades: [Int]! 
}
type User{
  id:ID!
  name:String!
  email: String!
  age: Int
}
type Post{
  id:ID!
  title:String!
  body: String!
  published:Boolean!
}
`;

// Resolvers
// 4
const resolvers = {
  Query: {
    grades: () => {
      return [1, 2, 3];
    },
    add: (parent, { numbers }) => {
      if (numbers.length) {
        return numbers.reduce((a, c) => a + c);
      }
      return 0;
    },
    greeting: (parent, { name }, context, info) => {
      if (name) {
        return `hi ${name}`;
      }
      return "Hello! Whoever you are!";
    },
    user: () => {
      return {
        id: 1,
        name: "Ben",
        email: "cbtsao47@gmail.com",
        age: 32
      };
    },
    post: () => {
      return {
        id: 1,
        title: "How to GQL",
        body: "typedefs+resolvers!",
        published: true
      };
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log("server is up!");
});
