import express from "express";
import middleware from '../middleware/index.js';

export const routes = express();

routes.post("/user/login");
routes.post("/user/register");

routes.use(middleware.verifyAuth);

routes.get("/user/list");

routes.put("/user/update");
