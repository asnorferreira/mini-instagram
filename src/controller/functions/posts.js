import knex from "../../configs/conection.js";

export const newPost = async (req, res) => {
  const { id } = req.usuario;
  const { texto, fotos } = req.body;

  if (!fotos || fotos.length === 0) {
    return res.status(400).json({ error: "Photo not found" });
  }

  try {
    const posts = await knex("postagens")
      .insert({
        texto,
        usuario_id: id,
      })
      .returning("*");

    if (!posts || posts.length === 0) {
      return res.status(400).json({ error: "Failed to create post" });
    }

    const postId = posts[0].id;

    const postPhoto = await knex("postagem_fotos").insert(
      fotos.map((foto) => ({ ...foto, postagem_id: postId }))
    );

    if (!postPhoto) {
      await knex("postagens").where({ id: postId }).del();
      return res.status(400).json({ error: "Failed to save post photos" });
    }

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.usuario;
  const { postId } = req.params;

  try {
    const posts = await knex("postagens").where({ id: postId }).first();

    if (!posts) {
      return res.status(400).json({ error: "Post not found" });
    }

    try {
      await knex("postagem_curtidas").insert({
        usuario_id: id,
        postagem_id: postId,
      });

      return res.status(201).json({ message: "Post liked successfully" });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "You already liked this post" });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const removeLikePost = async (req, res) => {
  const { id } = req.usuario;
  const { postId } = req.params;

  try {
    const posts = await knex("postagens").where({ id: postId }).first();

    if (!posts) {
      return res.status(400).json({ error: "Post not found" });
    }

    try {
      await knex("postagem_curtidas")
        .where({
          usuario_id: id,
          postagem_id: postId,
        })
        .del();

      return res.status(201).json({ message: "Post was unliked successfully" });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "You already unliked this post" });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
