const Query = {
  comments: (parent, args, { db: { comments } }, info) => {
    return comments;
  },
  posts: (parent, { query }, { db: { posts } }, info) => {
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
  users: (parent, { query }, { db: { users } }, info) => {
    if (query) {
      return users.filter(user =>
        user.name.toUpperCase().includes(query.toUpperCase())
      );
    }
    return users;
  },
  me: (parent, args, { db: { users } }, info) => {
    return users;
  }
};
export default Query;
