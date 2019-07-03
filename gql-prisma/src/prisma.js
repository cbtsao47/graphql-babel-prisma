import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

prisma.query.users(null, `{id name email}`).then(res => {
  console.log(JSON.stringify(res, undefined, 4));
});

prisma.query.comments(null, `{id text author{id name}}`).then(res => {
  console.log(JSON.stringify(res, undefined, 4));
});
