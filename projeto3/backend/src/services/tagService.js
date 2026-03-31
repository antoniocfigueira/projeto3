const db = require("../db")

const getTags = async () => {
  const [rows] = await db.query("SELECT * FROM tags")
  return rows
}

const createTag = async (nome) => {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome da tag obrigatório")
  }

  const [result] = await db.query(
    "INSERT INTO tags (nome) VALUES (?)",
    [nome]
  )

  return {
    id: result.insertId,
    nome
  }
}

const deleteTag = async (id, taskService) => {
  const [tags] = await db.query("SELECT * FROM tags WHERE id = ?", [id])
  if (tags.length === 0) throw new Error("Tag não encontrada")

  await db.query("DELETE FROM tags WHERE id = ?", [id])
  await db.query("DELETE FROM task_tags WHERE tagId = ?", [id])

  return { message: "Tag removida" }
}

const getTagById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [id])
  return rows[0]
}

module.exports = {
  getTags,
  createTag,
  deleteTag,
  getTagById
}