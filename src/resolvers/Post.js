const Post = {
  author: (parent, args, context, info) => {
    return users.find(user => user.id === parent.author);
  },
  comments: (parent, args, context, info) => {
    return comments.filter(comment => comment.post === parent.id);
  }
};

export default Post;
