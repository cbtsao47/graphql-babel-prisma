import uuidv4 from "uuid/v4";
const Mutation = {
  createUser: (parent, { data }, { db: { users } }, info) => {
    const emailTaken = users.some(user => {
      return user.email === data.email;
    });
    if (emailTaken) {
      throw new Error("Oops! That email has been taken");
    }
    const newUser = {
      id: uuidv4(),
      ...data
    };
    users.push(newUser);
    return newUser;
  },
  createPost: (parent, { data }, { db: { users, posts } }, info) => {
    const userExists = users.some(user => user.id === data.author);
    if (!userExists) {
      throw new Error("User not found");
    }
    const newPost = {
      id: uuidv4(),
      ...data
    };
    posts.push(newPost);
    return newPost;
  },
  createComment: (
    parent,
    { data },
    { db: { users, posts, comments } },
    info
  ) => {
    const userExists = users.some(user => user.id === data.author);
    const postExistsAndPublished = posts.some(
      post => post.id === data.post && post.published
    );
    if (!userExists || !postExistsAndPublished) {
      throw new Error("Unable to find user or post");
    }
    const newComment = {
      id: uuidv4(),
      ...data
    };
    comments.push(newComment);
    return newComment;
  },
  updateUser: (parent, { id, data }, { db }, info) => {
    const user = db.users.find(user => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    if (typeof data.email === "string") {
      const emailTaken = db.users.some(user => user.email === data.email);
      if (emailTaken) {
        throw new Error("Email has been used by another user");
      }
      user.email = data.email;
    }
    if (typeof data.name === "string") {
      user.name = data.name;
    }
  },
  deleteUser: (parent, { id }, { db: { users, posts, comments } }, info) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex < 0) {
      throw new Error("User not found");
    }
    const deletedUser = users.splice(userIndex, 1);
    posts = posts.filter(post => post.author !== id);
    comments = comments.filter(comment => comment.author !== id);
    return deletedUser[0];
  },
  deletePost: (parent, { id }, { db: { posts, comments } }, info) => {
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex < 0) {
      throw new Error("Post not found");
    }
    const deletedPost = posts.splice(postIndex, 1);
    comments = comments.filter(comment => comment.author !== id);
    return deletedPost[0];
  },
  deleteComment: (parent, { id }, { db: { comments } }, info) => {
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex < 0) {
      throw new Error("Comment not found");
    }
    const deletedComment = comments.splice(commentIndex, 1);
    return deletedComment[0];
  }
};

export default Mutation;
