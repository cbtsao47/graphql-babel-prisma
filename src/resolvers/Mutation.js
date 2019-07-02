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
  createPost: (parent, { data }, { db: { users, posts }, pubsub }, info) => {
    const userExists = users.some(user => user.id === data.author);
    if (!userExists) {
      throw new Error("User not found");
    }
    const newPost = {
      id: uuidv4(),
      ...data
    };
    posts.push(newPost);
    if (data.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: newPost
        }
      });
    }
    return newPost;
  },
  createComment: (
    parent,
    { data },
    { db: { users, posts, comments }, pubsub },
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
    pubsub.publish(`comment ${data.post}`, {
      comment: {
        mutation: "CREATED",
        data: newComment
      }
    });
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
    return user;
  },
  updatePost: (
    parent,
    { id, data: { title, body, published } },
    { db: { posts } },
    info
  ) => {
    const post = posts.find(post => post.id === id);
    const originalPost = { ...post };
    if (!post) {
      throw new Error("Post not found");
    }
    if (title) {
      post.title = title;
    }
    if (body) {
      post.body = body;
    }
    if (typeof published === "boolean") {
      post.published = published;
      if (originalPost.published && !published) {
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: { post }
          }
        });
      } else if (!originalPost.published && published) {
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: { post }
          }
        });
      }
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: { post }
        }
      });
    }

    return post;
  },
  updateComment: (
    parent,
    { postId, data: { text } },
    { db: { comments }, pubsub },
    info
  ) => {
    const comment = comments.find(comment => comment.post === postId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (text) {
      comment.text = text;
    }
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    });
    return comment;
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
  deletePost: (parent, { id }, { db: { posts, comments }, pubsub }, info) => {
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex < 0) {
      throw new Error("Post not found");
    }
    const [deletedPost] = posts.splice(postIndex, 1);
    comments = comments.filter(comment => comment.author !== id);
    if (deletedPost.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: deletedPost
        }
      });
    }
    return deletedPost[0];
  },
  deleteComment: (parent, { id }, { db: { comments }, pubsub }, info) => {
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex < 0) {
      throw new Error("Comment not found");
    }
    const deletedComment = comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment
      }
    });
    return deletedComment[0];
  }
};

export default Mutation;
