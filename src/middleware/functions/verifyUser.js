export const verifyUser = async (req, res, next) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must contain at least 6 characters" });
  }

  next();
};
