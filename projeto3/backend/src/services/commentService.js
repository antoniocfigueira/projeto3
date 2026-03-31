const db = require("../db")

const createComment = async (taskId, userId, conteudo, taskService, userService) => {

  const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId])
  if (tasks.length === 0) throw new Error("Tarefa não encontrada")

  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [userId])
  if (users.length === 0) throw new Error("Utilizador não encontrado")

  if (!conteudo || conteudo.trim() === "") {
    throw new Error("Conteúdo obrigatório")
  }

  const [result] = await db.query(
    "INSERT INTO comments (taskId, userId, conteudo, dataCriacao) VALUES (?, ?, ?, NOW())",
    [taskId, userId, conteudo]
  )

  return {
    id: result.insertId,
    taskId: Number(taskId),
    userId: Number(userId),
    conteudo,
    dataCriacao: new Date()
  }
}

const getCommentsByTask = async (taskId) => {
  const [rows] = await db.query("SELECT * FROM comments WHERE taskId = ?", [taskId])
  return rows
}

module.exports = {
  createComment,
  getCommentsByTask
}