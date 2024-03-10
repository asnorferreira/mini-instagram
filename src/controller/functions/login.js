import knex from "../../configs/conection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const user = await knex("usuarios").where({ username }).first();

    if (!user) {
      return res.status(400).json({ error: "Username is required" });
    }

    const correctPassword = await bcrypt.compare(senha, user.senha);

    if (!correctPassword) {
      return res.status(400).json({ error: "Password is required" });
    }

    const { senha: password, ...dataTokenUser } = user;

    const token = jwt.sign(dataTokenUser, process.env.JWT_PASS, {
      expiresIn: 86400,
    });

    return res.status(200).json({ user: dataTokenUser, token });
  } catch (error) {
    console.error("Error while verifying username", error);
    return res.status(500).json({ error: error.message });
  }
};
