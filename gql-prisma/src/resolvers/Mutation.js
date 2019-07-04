import uuidv4 from "uuid/v4";
const Mutation = {
  createUser: async (parent, { data }, { prisma }, info) => {
    return prisma.mutation.createUser({ data }, info);
  },
  createPost: (parent, { data }, { prisma, pubsub }, info) => {
    const opArgs = {
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
        author: { connect: { id: data.author } }
      }
    };

    return prisma.mutation.createPost(opArgs, info);
  },
  createComment: (parent, { data }, { prisma }, info) => {
    const opArgs = {
      data: {
        ...data,
        author: { connect: { id: data.author } },
        post: { connect: { id: data.post } }
      }
    };
    return prisma.mutation.createComment(opArgs, info);
  },
  updateUser: (parent, { id, data }, { prisma }, info) => {
    const opArgs = { where: { id }, data };
    return prisma.mutation.updateUser(opArgs, info);
  },
  updatePost: (parent, { id, data }, { prisma }, info) => {
    const opArgs = { where: { id }, data };
    return prisma.mutation.updatePost(opArgs, info);
  },
  updateComment: (parent, { postId, data }, { prisma }, info) => {
    const opArgs = {
      where: { id: postId },
      data: {
        ...data,
        author: { connect: { id: data.author } },
        post: { connect: { id: data.post } }
      }
    };
    return prisma.mutation.updateComment(opArgs, info);
  },
  deleteUser: async (parent, { id }, { prisma }, info) => {
    const opArgs = { where: { id } };
    return prisma.mutation.deleteUser(opArgs, info);
  },
  deletePost: (parent, { id }, { prisma }, info) => {
    const opsArgs = { where: { id } };
    return prisma.mutation.deletePost(opsArgs, info);
  },
  deleteComment: (parent, { id }, { prisma }, info) => {
    const opArgs = { where: { id } };
    return prisma.mutation.deleteComment(opArgs, info);
  }
};

export default Mutation;
