const Comment = {
  author: (parent, args, context, info) => {
    const result = users.find(user => parent.author === user.id);
    return result;
  },
  post: (parent, args, context, info) => {
    return posts.find(post => post.id === parent.post);
  }
};
export default Comment;
