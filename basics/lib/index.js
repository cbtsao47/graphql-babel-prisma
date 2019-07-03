"use strict";

var _graphqlYoga = require("graphql-yoga");

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 5 Scalar types - a type stores a single value
// string, boolean, int,float, ID
// custom types - a type that can be objects,arrays,scalar
// input type can only have scalar valuess
// Type definitions (schema)
var typeDefs = "\ntype Query{\n  users(query: String):[User!]!\n  me:User!\n  post:Post!\n  posts(query: String):[Post!]!\n  comments:[Comment!]!\n}\ntype Mutation{\n  createUser(data:CreateUserInput): User!\n  createPost(title: String!, body: String!, published: Boolean! author: ID!): Post!\n  createComment(text: String!, author: ID!, post: ID!): Comment!\n}\ninput CreateUserInput{\n  name: String!\n  email: String!\n  age:Int\n}\ntype User{\n  id:ID!\n  name:String!\n  email: String!\n  age: Int\n  posts:[Post]!\n  comments:[Comment]!\n}\ntype Post{\n  id:ID!\n  title:String!\n  body: String!\n  published:Boolean!\n  author:User!\n  comments:[Comment]!\n}\ntype Comment{\n  id:ID!\n  text:String!\n  author:User!\n  post:Post!\n}\n";
var _comments = [{
  id: "1",
  text: "this is gold",
  author: "3",
  post: "1"
}, {
  id: "2",
  text: "late night GraphQL",
  author: "1",
  post: "3"
}, {
  id: "3",
  text: "get me a job",
  author: "1",
  post: "1"
}, {
  id: "4",
  text: "i'll work for food",
  author: "2",
  post: "2"
}, {
  id: "5",
  text: "bongocat",
  author: "1",
  post: "2"
}];
var _posts = [{
  id: "1",
  title: "watch this!",
  body: "best play 2019",
  published: true,
  author: "1"
}, {
  id: "2",
  title: "don't watch this!",
  body: "my mind is telling me no, but my body is telling me yes",
  published: true,
  author: "1"
}, {
  id: "3",
  title: "oh em geee",
  body: "meme of the century",
  published: false,
  author: "2"
}];
var _users = [{
  id: "1",
  name: "Ben",
  email: "ben@example.com",
  age: 32
}, {
  id: "2",
  name: "Erica",
  email: "erica@example.com"
}, {
  id: "3",
  name: "John",
  email: "john@example.com"
}]; // Resolvers
// 4

var resolvers = {
  Query: {
    comments: function comments() {
      return _comments;
    },
    posts: function posts(parent, _ref, context, info) {
      var query = _ref.query;

      if (query) {
        return _posts.filter(function (post) {
          return post.body.toUpperCase().includes(query.toUpperCase()) || post.title.toUpperCase().includes(query.toUpperCase());
        });
      }

      return _posts;
    },
    users: function users(parent, _ref2, context, info) {
      var query = _ref2.query;

      if (query) {
        return _users.filter(function (user) {
          return user.name.toUpperCase().includes(query.toUpperCase());
        });
      }

      return _users;
    },
    me: function me(parent) {
      return _users;
    },
    post: function post() {
      return {
        id: 1,
        title: "How to GQL",
        body: "typedefs+resolvers!",
        published: true
      };
    }
  },
  Mutation: {
    createUser: function createUser(parent, _ref3, context, info) {
      var name = _ref3.name,
          email = _ref3.email,
          age = _ref3.age;

      var emailTaken = _users.some(function (user) {
        return user.email === email;
      });

      if (emailTaken) {
        throw new Error("Oops! That email has been taken");
      }

      var newUser = {
        id: (0, _v["default"])(),
        name: name,
        email: email,
        age: age
      };

      _users.push(newUser);

      return newUser;
    },
    createPost: function createPost(parent, _ref4, context, info) {
      var title = _ref4.title,
          body = _ref4.body,
          author = _ref4.author,
          published = _ref4.published;

      var userExists = _users.some(function (user) {
        return user.id === author;
      });

      if (!userExists) {
        throw new Error("User not found");
      }

      var newPost = {
        id: (0, _v["default"])(),
        title: title,
        body: body,
        published: published,
        author: author
      };

      _posts.push(newPost);

      return newPost;
    },
    createComment: function createComment(parent, _ref5, context, info) {
      var text = _ref5.text,
          author = _ref5.author,
          post = _ref5.post;

      var userExists = _users.some(function (user) {
        return user.id === author;
      });

      var postExistsAndPublished = _posts.some(function (p) {
        return p.id === post && p.published;
      });

      if (!userExists || !postExistsAndPublished) {
        throw new Error("Unable to find user or post");
      }

      var newComment = {
        id: (0, _v["default"])(),
        text: text,
        author: author,
        post: post
      };

      _comments.push(newComment);

      return newComment;
    }
  },
  Post: {
    author: function author(parent, args, context, info) {
      return _users.find(function (user) {
        return user.id === parent.author;
      });
    },
    comments: function comments(parent, args, context, info) {
      return _comments.filter(function (comment) {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts: function posts(parent, args, context, info) {
      return _posts.filter(function (post) {
        return post.author === parent.id;
      });
    },
    comments: function comments(parent, args, context, info) {
      return _comments.filter(function (comment) {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author: function author(parent, args, context, info) {
      var result = _users.find(function (user) {
        return parent.author === user.id;
      });

      return result;
    },
    post: function post(parent, args, context, info) {
      return _posts.find(function (post) {
        return post.id === parent.post;
      });
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