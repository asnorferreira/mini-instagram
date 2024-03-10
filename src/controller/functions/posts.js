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

export const commentsPosts = async (req, res) => {
  const { id } = req.usuario;
  const { postId } = req.params;
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "Comment text is required" });
  }
  try {
    const posts = await knex("postagens").where({ id: postId }).first();

    if (!posts) {
      return res.status(400).json({ error: "Post not found" });
    }

    const comment = await knex("postagem_comentarios").insert({
      texto,
      usuario_id: id,
      postagem_id: postId,
    });

    if (!comment) {
      return res.status(400).json({ error: "Failed to save comment" });
    }

    return res.status(201).json({ message: "Post comment successfully" });
  } catch (error) {
    console.error("An error occurred while adding comment", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const removeCommentsPosts = async (req, res) => {
  const { id } = req.usuario;
  const { postId } = req.params;

  try {
    const post = await knex("postagens").where({ id: postId }).first();

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    const deletedCount = await knex("postagem_comentarios")
      .where({
        usuario_id: id,
        postagem_id: postId,
      })
      .del();

    if (deletedCount === 0) {
      return res.status(400).json({ error: "Failed to remove comment" });
    }

    return res
      .status(201)
      .json({ message: "Comment was removed successfully" });
  } catch (error) {
    console.error("An error occurred while removing comment", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const feed = async (req, res) => {
  const { id } = req.usuario;
  const { offset } = req.query;

  const o = offset ? offset : 0;

  try {
    const posts = await knex("postagens")
      .where("usuario_id", "!=", id)
      .limit(10)
      .offset(o);

    if (posts.length === 0) {
      return res.status(200).json(posts);
    }

    for (const post of posts) {
      const user = await knex("usuarios")
        .where({ id: post.usuario_id })
        .select("imagem", "username", "verificado")
        .first();
      post.user = user;

      const photos = await knex("postagem_fotos")
        .where({ postagem_id: post.id })
        .select("imagem");
      post.photos = photos;

      const likesCount = await knex("postagem_curtidas")
        .where({ postagem_id: post.id })
        .count("*")
        .first();
      post.likes = parseInt(likesCount.count);

      const likedByMe = await knex("postagem_curtidas")
        .where({ postagem_id: post.id, usuario_id: id })
        .first();
      post.likedByMe = likedByMe ? true : false;

      const comments = await knex("postagem_comentarios")
        .leftJoin("usuarios", "usuarios.id", "postagem_comentarios.usuario_id")
        .where({ postagem_id: post.id })
        .select("usuarios.username", "postagem_comentarios.texto");
      post.comments = comments;
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("An error occurred with the request", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
