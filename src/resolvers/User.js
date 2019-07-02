const User = {
  posts: (parent, args, context, info) => {
    return posts.filter(post => post.author === parent.id);
  },
  comments: (parent, args, context, info) => {
    return comments.filter(comment => comment.author === parent.id);
  }
};

export default User;
