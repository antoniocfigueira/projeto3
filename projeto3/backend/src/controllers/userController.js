const userService = require("../services/userService")

const getUsers = async (req, res) => {
  const users = await userService.getUsers(req.query.search, req.query.sort)
  res.json(users)
}

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body.nome, req.body.email)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const toggleUser = async (req, res) => {
  try {
    const user = await userService.toggleUser(req.user.id)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.user.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getStats = async (req, res) => {
  const stats = await userService.getUserStats()
  res.json(stats)
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  toggleUser,
  deleteUser,
  getStats
}