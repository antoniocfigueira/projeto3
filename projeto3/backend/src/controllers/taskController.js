const taskService = require("../services/taskService")
const tagService = require("../services/tagService")
const commentService = require("../services/commentService")
const userService = require("../services/userService")

const getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.query.search, req.query.sort)
  res.json(tasks)
}

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(
      req.body.titulo,
      req.body.categoria,
      req.body.responsavelNome
    )
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.task.id, req.body)
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.task.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getTaskTags = async (req, res) => {
  try {
    const tags = await taskService.getTaskTags(req.task.id);
    res.json(tags);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStats = async (req, res) => {
  const stats = await taskService.getTaskStats()
  res.json(stats)
}

const addTagToTask = async (req, res) => {
  try {
    const result = await taskService.addTagToTask(
      req.task.id,
      req.body.tagId,
      tagService
    )
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(
      req.task.id,
      req.body.userId,
      req.body.conteudo,
      taskService,
      userService
    )
    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getComments = async (req, res) => {
  const comments = await commentService.getCommentsByTask(req.task.id)
  res.json(comments)
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  addTagToTask,
  createComment,
  getComments,
  getTaskTags
}