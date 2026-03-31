const db = require("../db")

const getTasks = async (search, sort) => {
  let query = "SELECT * FROM tasks"
  let params = []

  if (search) {
    query += " WHERE titulo LIKE ?"
    params.push(`%${search}%`)
  }

  if (sort === "asc") {
    query += " ORDER BY titulo ASC"
  } else if (sort === "desc") {
    query += " ORDER BY titulo DESC"
  }

  const [rows] = await db.query(query, params)
  return rows
}

const createTask = async (titulo, categoria, responsavelNome) => {
  if (!titulo || titulo.length < 3) throw new Error("Título inválido")
  if (!responsavelNome) throw new Error("Responsável obrigatório")

  const [result] = await db.query(
    "INSERT INTO tasks (titulo, categoria, responsavelNome, concluida) VALUES (?, ?, ?, false)",
    [titulo, categoria, responsavelNome]
  )

  return {
    id: result.insertId,
    titulo,
    categoria,
    responsavelNome,
    concluida: false,
    dataConclusao: null
  }
}

const updateTask = async (id, data) => {
  const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ?", [id])
  if (tasks.length === 0) throw new Error("Tarefa não encontrada")

  const task = tasks[0]

  const titulo = data.titulo ?? task.titulo
  const categoria = data.categoria ?? task.categoria
  const responsavelNome = data.responsavelNome ?? task.responsavelNome
  const concluida = data.concluida ?? task.concluida
  const dataConclusao = concluida ? new Date() : null

  await db.query(
    "UPDATE tasks SET titulo=?, categoria=?, responsavelNome=?, concluida=?, dataConclusao=? WHERE id=?",
    [titulo, categoria, responsavelNome, concluida, dataConclusao, id]
  )

  return { ...task, ...data, dataConclusao }
}

const deleteTask = async (id) => {
  const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id])
  if (result.affectedRows === 0) throw new Error("Tarefa não encontrada")

  return { message: "Tarefa removida" }
}

const getTaskStats = async () => {
  const [rows] = await db.query("SELECT * FROM tasks")

  const total = rows.length
  const concluidas = rows.filter(t => t.concluida).length
  const pendentes = total - concluidas

  return { total, pendentes, concluidas }
}

const getTaskTags = async (taskId) => {
  const [rows] = await db.query(`
    SELECT tags.*
    FROM tags
    JOIN task_tags ON tags.id = task_tags.tagId
    WHERE task_tags.taskId = ?
  `, [taskId]);

  return rows;
};
const addTagToTask = async (taskId, tagId) => {

  const [tag] = await db.query("SELECT * FROM tags WHERE id = ?", [tagId]);

  if (tag.length === 0) {
    throw new Error("Tag não existe");
  }

  await db.query(
    "INSERT INTO task_tags (taskId, tagId) VALUES (?, ?)",
    [taskId, tagId]
  );

  return { message: "Tag associada" };
};

const getTasksByTag = async (tagId) => {
  const [rows] = await db.query(
    `SELECT t.* FROM tasks t
     JOIN task_tags tt ON t.id = tt.taskId
     WHERE tt.tagId = ?`,
    [tagId]
  )

  return rows
}

const removeTagAssociations = async (tagId) => {
  await db.query("DELETE FROM task_tags WHERE tagId = ?", [tagId])
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  addTagToTask,
  getTasksByTag,
  removeTagAssociations,
  getTaskTags
}