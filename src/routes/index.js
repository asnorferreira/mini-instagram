import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

export const routes = express();

routes.post("/user/login", controller.login);
routes.post("/user/register");

routes.use(middleware.verifyAuth);

routes.get("/user/list");

routes.put("/user/update");
