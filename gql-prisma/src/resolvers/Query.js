const Query = {
  comments: (parent, args, { prisma }, info) => {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        text_contains: args.query
      };
    }
    return prisma.query.comments(opArgs, info);
  },
  posts: (parent, { query }, { prisma }, info) => {
    const opArgs = {};
    if (query) {
      opArgs.where = {
        OR: [
          {
            title_contains: query
          },
          { body_contains: query }
        ]
      };
    }
    return prisma.query.posts(opArgs, info);
  },
  users: (parent, { query }, { prisma }, info) => {
    const opArgs = {};
    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          },
          { email_contains: query }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  me: (parent, args, { db: { users } }, info) => {
    return users;
  }
};
export default Query;
