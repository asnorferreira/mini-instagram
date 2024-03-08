import knex from "../../configs/conection.js";
import { config } from "dotenv";

config();

export const login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const user = await knex("usuarios").where({ username }).first();

    if (!user) {
      return res.status(400).json({ error: "Username is required" });
    }

    const correctPassword = await bcrypt.compare(senha, usuario.senha);

    if (!correctPassword) {
      return res.status(400).json({ error: "Password is required" });
    }

    const dataTokenUser = { id: usuario.id, username: usuario.username };

    const token = jwt.sign(dataTokenUser, process.env.JWT_PASS, {
      expiresIn: 86400,
    });

    return res.status(200).json({ usuario: dataTokenUser, token });
  } catch (error) {
    console.error("Error while verifying email");
    return res.status(500).json({ error: error.message });
  }
};
