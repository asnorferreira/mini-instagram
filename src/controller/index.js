import { login } from "./functions/login.js";
import { register } from "./functions/users.js";
import { profile } from "./functions/users.js";
import { updateProfile } from "./functions/users.js";
import { newPost } from "./functions/posts.js";
import { likePost } from "./functions/posts.js";
import { removeLikePost } from "./functions/posts.js";
import { commentsPosts } from "./functions/posts.js";
import { removeCommentsPosts } from "./functions/posts.js";
import { feed } from "./functions/posts.js";

export default {
  login,
  register,
  profile,
  updateProfile,
  newPost,
  likePost,
  removeLikePost,
  commentsPosts,
  removeCommentsPosts,
  feed,
};
