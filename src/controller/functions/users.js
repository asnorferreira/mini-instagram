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

export const profile = (req, res) => {
  return res.status(200).json(req.usuario);
};

export const updateProfile = async (req, res) => {
  let { nome, email, senha, imagem, username, site, bio, telefone, genero } =
    req.body;
  const { id } = req.usuario;

  if (
    !nome &&
    !email &&
    !senha &&
    !imagem &&
    !username &&
    !site &&
    !bio &&
    !telefone &&
    !genero
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    if (email !== req.usuario.email) {
      const userEmail = await knex("usuarios").where({ email }).first();

      if (userEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    if (username !== req.usuario.username) {
      const userUsername = await knex("usuarios").where({ username }).first();

      if (userUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    const updateUserCount = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha: hash,
      imagem,
      username,
      site,
      bio,
      telefone,
      genero,
    });

    if (!updateUserCount) {
      return res.status(400).json({ error: "User was not update" });
    }

    return res.status(201).json({ message: "User was update" });
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
