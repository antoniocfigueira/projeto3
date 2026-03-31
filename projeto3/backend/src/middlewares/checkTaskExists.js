const db = require("../db")

const checkTaskExists = async (req, res, next) => {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [req.params.id]
  )

  if (rows.length === 0) {
    return res.status(404).json({ error: "Task não encontrada" })
  }

  req.task = rows[0]
  next()
}

module.exports = checkTaskExists