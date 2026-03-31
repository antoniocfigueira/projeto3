const db = require("../db")

const checkUserExists = async (req, res, next) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id])

  if (rows.length === 0) {
    return res.status(404).json({ error: "Utilizador não encontrado" })
  }

  req.user = rows[0]
  next()
}

module.exports = checkUserExists