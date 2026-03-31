const tagService = require("../services/tagService")
const taskService = require("../services/taskService")

const getTags = async (req, res) => {
  const tags = await tagService.getTags()
  res.json(tags)
}

const createTag = async (req, res) => {
  try {
    const tag = await tagService.createTag(req.body.nome)
    res.status(201).json(tag)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteTag = async (req, res) => {
  try {
    const result = await tagService.deleteTag(req.params.id, taskService)
    res.json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getTasksByTag = async (req, res) => {
  const tasks = await taskService.getTasksByTag(req.params.id)
  res.json(tasks)
}

module.exports = {
  getTags,
  createTag,
  deleteTag,
  getTasksByTag
}