const Comment = {
  author: (parent, args, { db: { users } }, info) => {
    const result = users.find(user => parent.author === user.id);
    return result;
  },
  post: (parent, args, { db: { posts } }, info) => {
    return posts.find(post => post.id === parent.post);
  }
};
export default Comment;
