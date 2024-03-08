import knex from "../../configs/conection.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const token = authHeader.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.JWT_PASS);

    const authUser = await knex("usuarios").select("id").where({ id }).first();

    if (!authUser) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { senha, ...usuario } = authUser;

    req.usuario = usuario;

    next();
  } catch (error) {
    console.error("Error of authorization: ", error);
    return res.status(500).json({ error: error.message });
  }
};
