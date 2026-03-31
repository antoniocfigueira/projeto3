import * as taskAPI from './api/apiTaskService.js';
import * as userAPI from './api/apiUserService.js';
import * as tagAPI from './api/apiTagService.js';

// TASKS
async function loadTasks() {
  const tasks = await taskAPI.getTasks();
  const container = document.getElementById("taskList")!;
  container.innerHTML = "";

  for (const t of tasks) {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.background = "#fff";

    // TAGS
    let tagsHTML = "nenhuma";
    try {
      const tags = await taskAPI.getTaskTags(t.id);
      tagsHTML = tags.map((tag: any) => `🏷️ ${tag.nome}`).join(", ");
    } catch {}

    // COMMENTS
    let commentsHTML = "sem comentários";
    try {
      const comments = await taskAPI.getTaskComments(t.id);
      commentsHTML = comments.map((c: any) =>
        `<div style="margin-left:10px;">💬 ${c.conteudo}</div>`
      ).join("");
    } catch {}

    div.innerHTML = `
      <h3>${t.titulo} (#${t.id})</h3>
      <div>📂 ${t.categoria}</div>
      <div><b>Responsável:</b> ${t.responsavelNome}</div>

      <div style="margin-top:10px;">
        <b>Tags:</b> ${tagsHTML}
      </div>

      <div style="margin-top:10px;">
        <b>Comentários:</b>
        ${commentsHTML}
      </div>

      <div style="margin-top:10px;">
        <button onclick="deleteTaskUI(${t.id})">❌ Apagar</button>
        <button onclick="addTagUI(${t.id})">🏷️ Tag</button>
        <button onclick="addCommentUI(${t.id})">💬 Comentar</button>
      </div>
    `;

    container.appendChild(div);
  }
}

async function createTaskUI() {
  const titulo = prompt("Título:");
  const categoria = prompt("Categoria:");
  const responsavelNome = prompt("Responsável:");

  if (!titulo || !categoria || !responsavelNome) return;

  await taskAPI.createTask({ titulo, categoria, responsavelNome });
  await loadTasks();
}

async function deleteTaskUI(id: number) {
  await taskAPI.deleteTask(id);
  await loadTasks();
}

async function addTagUI(taskId: number) {
  const tagId = prompt("ID da tag:");
  if (!tagId) return;

  await taskAPI.addTagToTask(taskId, Number(tagId));
  await loadTasks();
}

async function addCommentUI(taskId: number) {
  const userId = prompt("ID do user:");
  const conteudo = prompt("Comentário:");

  if (!userId || !conteudo) return;

  await taskAPI.createComment(taskId, Number(userId), conteudo);
  await loadTasks();
}

// USERS
async function loadUsers() {
  const users = await userAPI.getUsers();
  const list = document.getElementById("userList")!;
  list.innerHTML = "";

  users.forEach((u: any) => {
    const li = document.createElement("li");
    li.innerHTML = `${u.id} - ${u.nome}`;
    list.appendChild(li);
  });
}

async function createUserUI() {
  const nome = prompt("Nome:");
  const email = prompt("Email:");

  if (!nome || !email) return;

  await userAPI.createUser({ nome, email });
  await loadUsers();
}

// TAGS
async function loadTags() {
  const tags = await tagAPI.getTags();
  const list = document.getElementById("tagList")!;
  list.innerHTML = "";

  tags.forEach((t: any) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.id} - ${t.nome}`;
    list.appendChild(li);
  });
}

async function createTagUI() {
  const nome = prompt("Nome da tag:");
  if (!nome) return;

  await tagAPI.createTag({ nome });
  await loadTags();
}

// GLOBAL
(window as any).loadTasks = loadTasks;
(window as any).createTaskUI = createTaskUI;
(window as any).deleteTaskUI = deleteTaskUI;
(window as any).addTagUI = addTagUI;
(window as any).addCommentUI = addCommentUI;

(window as any).loadUsers = loadUsers;
(window as any).createUserUI = createUserUI;

(window as any).loadTags = loadTags;
(window as any).createTagUI = createTagUI;