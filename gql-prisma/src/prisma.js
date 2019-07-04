import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

export default prisma;
// const createPostForUser = async (authorId, data) => {
//   const user = await prisma.exists.User({ id: authorId });
//   if (!user) {
//     throw new Error("User not found");
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: { id: authorId }
//         }
//       }
//     },
//     "{author {id name email posts {id title published}}}"
//   );
//   return post.author;
// };

// const updatePostForUser = async (id, data) => {
//   const post = await prisma.exists.Post({ id });
//   if (!post) {
//     throw new Error("Post not found");
//   }
//   const updatedPost = await prisma.mutation.updateUserPost(
//     { where: { id }, data },
//     "{author{id name email posts {id title published}}}"
//   );
//   return updatedPost.author;
// };

// const deletePostForUser = async id => {
//   const post = await prisma.exists.Post({ id });
//   if (!post) {
//     throw new Error("Post not found");
//   }
//   const deletedPost = await prisma.mutation.deleteUserPost(
//     { where: { id } },
//     "{id}"
//   );
//   return deletedPost;
// };
// example query
// prisma.query.users(null, `{id name email posts{id title}}`).then(res => {
//   console.log(JSON.stringify(res, undefined, 4));
// });

// prisma.query.comments(null, `{id text author{id name}}`).then(res => {
//   console.log(JSON.stringify(res, undefined, 4));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "new gql post!",
//         body: "you can find the new materials here!",
//         published: true,
//         author: {
//           connect: { id: "cjxmn57cf023g0722xcjj4oth" }
//         }
//       }
//     },
//     `{id title body published}`
//   )
//   .then(res => console.log(res));

// prisma.mutation
//   .updatePost(
//     {
//       where: { id: "cjxnlkwur001u072280eiijnq" },
//       data: {
//         body: "this is an update",
//         published: true
//       }
//     },
//     `{id title body published}`
//   )
//   .then(res => {
//     return prisma.query.posts(null, `{id title body published}`);
//   })
//   .then(res => console.log(res));
