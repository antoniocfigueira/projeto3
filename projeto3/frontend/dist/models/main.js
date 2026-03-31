"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTasks = loadTasks;
exports.createTaskUI = createTaskUI;
exports.deleteTaskUI = deleteTaskUI;
exports.loadUsers = loadUsers;
exports.createUserUI = createUserUI;
exports.loadTags = loadTags;
exports.createTagUI = createTagUI;
const apiTaskService_1 = require("./api/apiTaskService");
const apiUserService_1 = require("./api/apiUserService");
const apiTagService_1 = require("./api/apiTagService");
// TASKS
let tasks = [];
async function loadTasks() {
    tasks = await (0, apiTaskService_1.getTasks)();
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${task.titulo}
      <button onclick="deleteTaskUI(${task.id})">❌</button>
    `;
        list.appendChild(li);
    });
}
async function createTaskUI() {
    const titulo = prompt("Título:");
    const categoria = prompt("Categoria:");
    const responsavelNome = prompt("Responsável:");
    if (!titulo || !categoria || !responsavelNome)
        return;
    await (0, apiTaskService_1.createTask)({ titulo, categoria, responsavelNome });
    await loadTasks();
}
async function deleteTaskUI(id) {
    await (0, apiTaskService_1.deleteTask)(id);
    await loadTasks();
}
// USERS
async function loadUsers() {
    const users = await (0, apiUserService_1.getUsers)();
    const list = document.getElementById("userList");
    list.innerHTML = "";
    users.forEach(u => {
        const li = document.createElement("li");
        li.textContent = u.nome;
        list.appendChild(li);
    });
}
async function createUserUI() {
    const nome = prompt("Nome:");
    const email = prompt("Email:");
    if (!nome || !email)
        return;
    await (0, apiUserService_1.createUser)({ nome, email });
    await loadUsers();
}
// TAGS
async function loadTags() {
    const tags = await (0, apiTagService_1.getTags)();
    const list = document.getElementById("tagList");
    list.innerHTML = "";
    tags.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t.nome;
        list.appendChild(li);
    });
}
async function createTagUI() {
    const nome = prompt("Nome da tag:");
    if (!nome)
        return;
    await (0, apiTagService_1.createTag)({ nome });
    await loadTags();
}
// 🔥 LIGAR AO HTML
window.loadTasks = loadTasks;
window.createTaskUI = createTaskUI;
window.deleteTaskUI = deleteTaskUI;
window.loadUsers = loadUsers;
window.createUserUI = createUserUI;
window.loadTags = loadTags;
window.createTagUI = createTagUI;
