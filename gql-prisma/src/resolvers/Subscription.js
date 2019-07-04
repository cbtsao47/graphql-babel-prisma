import prisma from "../prisma";

// pubsub.asyncIterator sets up the channel to listen to
// pubsub.publish sets up the channel to publish to
const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { prisma }, info) => {
      return prisma.subscription.comment(null, info);
    }
  },
  post: {
    subscribe: (parent, args, { pubsub, db: { posts } }, info) => {
      return pubsub.asyncIterator("post");
    }
  }
};

export default Subscription;
