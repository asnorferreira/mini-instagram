import knex from "../../configs/conection.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const user = await knex("usuarios").where({ username }).first();

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const existuser = await knex("usuarios").insert({ username, senha: hash });

    if (!existuser) {
      return res.status(400).json({ error: "User was not register" });
    }

    return res.status(201).json({ message: "User was register" });
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
