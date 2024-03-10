import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

export const routes = express();

routes.post("/user/login", middleware.verifyUser, controller.login);
routes.post("/user/register", middleware.verifyUser, controller.register);

routes.use(middleware.verifyAuth);

routes.get("/user/list", controller.profile);

routes.put("/user/update", middleware.verifyUser, controller.updateProfile);

routes.post("/posts/register", controller.newPost);
routes.post("/posts/like/:postId", controller.likePost);

routes.delete("/posts/unlike/:postId", controller.removeLikePost);
