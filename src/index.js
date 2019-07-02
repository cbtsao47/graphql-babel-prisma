import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";
// 5 Scalar types - a type stores a single value
// string, boolean, int,float, ID
// custom types - a type that can be objects,arrays,scalar
// input type can only have scalar valuess
// Type definitions (schema)

let comments = [
  {
    id: "1",
    text: "this is gold",
    author: "3",
    post: "1"
  },
  {
    id: "2",
    text: "late night GraphQL",
    author: "1",
    post: "3"
  },
  {
    id: "3",
    text: "get me a job",
    author: "1",
    post: "1"
  },
  {
    id: "4",
    text: "i'll work for food",
    author: "2",
    post: "2"
  },
  {
    id: "5",
    text: "bongocat",
    author: "1",
    post: "2"
  }
];
let posts = [
  {
    id: "1",
    title: "watch this!",
    body: "best play 2019",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "don't watch this!",
    body: "my mind is telling me no, but my body is telling me yes",
    published: true,
    author: "1"
  },
  {
    id: "3",
    title: "oh em geee",
    body: "meme of the century",
    published: false,
    author: "2"
  }
];
let users = [
  {
    id: "1",
    name: "Ben",
    email: "ben@example.com",
    age: 32
  },
  {
    id: "2",
    name: "Erica",
    email: "erica@example.com"
  },
  {
    id: "3",
    name: "John",
    email: "john@example.com"
  }
];
// Resolvers
// 4
const resolvers = {
  Query: {
    comments: () => {
      return comments;
    },
    posts: (parent, { query }, context, info) => {
      if (query) {
        return posts.filter(post => {
          return (
            post.body.toUpperCase().includes(query.toUpperCase()) ||
            post.title.toUpperCase().includes(query.toUpperCase())
          );
        });
      }
      return posts;
    },
    users: (parent, { query }, context, info) => {
      if (query) {
        return users.filter(user =>
          user.name.toUpperCase().includes(query.toUpperCase())
        );
      }
      return users;
    },
    me: parent => {
      return users;
    },
    post: () => {
      return {
        id: 1,
        title: "How to GQL",
        body: "typedefs+resolvers!",
        published: true
      };
    }
  },
  Mutation: {
    createUser: (parent, { data }, context, info) => {
      const emailTaken = users.some(user => {
        return user.email === data.email;
      });
      if (emailTaken) {
        throw new Error("Oops! That email has been taken");
      }
      const newUser = {
        id: uuidv4(),
        ...data
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (parent, { data }, context, info) => {
      const userExists = users.some(user => user.id === data.author);
      if (!userExists) {
        throw new Error("User not found");
      }
      const newPost = {
        id: uuidv4(),
        ...data
      };
      posts.push(newPost);
      return newPost;
    },
    createComment: (parent, { data }, context, info) => {
      const userExists = users.some(user => user.id === data.author);
      const postExistsAndPublished = posts.some(
        post => post.id === data.post && post.published
      );
      if (!userExists || !postExistsAndPublished) {
        throw new Error("Unable to find user or post");
      }
      const newComment = {
        id: uuidv4(),
        ...data
      };
      comments.push(newComment);
      return newComment;
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex < 0) {
        throw new Error("User not found");
      }
      const deletedUser = users.splice(userIndex, 1);
      posts = posts.filter(post => post.author !== id);
      comments = comments.filter(comment => comment.author !== id);
      return deletedUser[0];
    },
    deletePost: (parent, { id }, context, info) => {
      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex < 0) {
        throw new Error("Post not found");
      }
      const deletedPost = posts.splice(postIndex, 1);
      comments = comments.filter(comment => comment.author !== id);
      return deletedPost[0];
    },
    deleteComment: (parent, { id }, context, info) => {
      const commentIndex = comments.findIndex(comment => comment.id === id);
      if (commentIndex < 0) {
        throw new Error("Comment not found");
      }
      const deletedComment = comments.splice(commentIndex, 1);
      return deletedComment[0];
    }
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find(user => user.id === parent.author);
    },
    comments: (parent, args, context, info) => {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter(post => post.author === parent.id);
    },
    comments: (parent, args, context, info) => {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author: (parent, args, context, info) => {
      const result = users.find(user => parent.author === user.id);
      return result;
    },
    post: (parent, args, context, info) => {
      return posts.find(post => post.id === parent.post);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => {
  console.log("server is up!");
});
