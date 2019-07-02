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

const db = {
  users,
  posts,
  comments
};
export default db;
