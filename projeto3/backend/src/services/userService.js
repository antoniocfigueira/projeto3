const db = require("../db")

const getUsers = async (search, sort) => {
  let query = "SELECT * FROM users"
  let params = []

  if (search) {
    query += " WHERE nome LIKE ?"
    params.push(`%${search}%`)
  }

  if (sort === "asc") {
    query += " ORDER BY nome ASC"
  } else if (sort === "desc") {
    query += " ORDER BY nome DESC"
  }

  const [rows] = await db.query(query, params)
  return rows
}

const createUser = async (nome, email) => {
  if (!nome) throw new Error("Nome obrigatório")
  if (!email || !email.includes("@")) throw new Error("Email inválido")

  const [result] = await db.query(
    "INSERT INTO users (nome, email, ativo) VALUES (?, ?, true)",
    [nome, email]
  )

  return {
    id: result.insertId,
    nome,
    email,
    ativo: true
  }
}

const updateUser = async (id, data) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id])
  if (users.length === 0) throw new Error("Utilizador não encontrado")

  const user = users[0]

  const nome = data.nome ?? user.nome
  const email = data.email ?? user.email
  const ativo = data.ativo ?? user.ativo

  if (email && !email.includes("@")) throw new Error("Email inválido")

  await db.query(
    "UPDATE users SET nome=?, email=?, ativo=? WHERE id=?",
    [nome, email, ativo, id]
  )

  return { ...user, ...data }
}

const toggleUser = async (id) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id])
  if (users.length === 0) throw new Error("Utilizador não encontrado")

  const user = users[0]
  const novoEstado = !user.ativo

  await db.query("UPDATE users SET ativo=? WHERE id=?", [novoEstado, id])

  return { ...user, ativo: novoEstado }
}

const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id])
  if (result.affectedRows === 0) throw new Error("Utilizador não encontrado")

  return { message: "Utilizador removido" }
}

const getUserStats = async () => {
  const [rows] = await db.query("SELECT * FROM users")

  const total = rows.length
  const ativos = rows.filter(u => u.ativo).length

  return {
    total,
    ativos,
    percentagem: total === 0 ? 0 : (ativos / total) * 100
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  toggleUser,
  deleteUser,
  getUserStats
}