// pubsub.asyncIterator sets up the channel to listen to
// pubsub.publish sets up the channel to publish to
const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { pubsub, db: { posts } }, info) => {
      const post = posts.find(post => post.id === postId && post.published);
      if (!post) {
        throw new Error("Post not found");
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe: (parent, args, { pubsub, db: { posts } }, info) => {
      return pubsub.asyncIterator("post");
    }
  }
};

export default Subscription;
