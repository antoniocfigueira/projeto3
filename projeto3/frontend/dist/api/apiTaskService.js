const BASE_URL = 'http://localhost:3000';
export async function getTasks() {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok)
        throw new Error("Erro ao buscar tasks");
    return await res.json();
}
export async function createTask(task) {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    if (!res.ok)
        throw new Error("Erro ao criar task");
}
export async function deleteTask(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE"
    });
    if (!res.ok)
        throw new Error("Erro ao apagar task");
}
export async function addTagToTask(taskId, tagId) {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagId })
    });
    if (!res.ok)
        throw new Error("Erro ao adicionar tag");
}
export async function getTaskComments(taskId) {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments`);
    if (!res.ok)
        throw new Error("Erro ao buscar comentários");
    return await res.json();
}
export async function createComment(taskId, userId, conteudo) {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, conteudo })
    });
    if (!res.ok)
        throw new Error("Erro ao criar comentário");
}
export async function getTaskTags(taskId) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}/tags`);
    if (!res.ok)
        throw new Error("Erro ao buscar tags");
    return await res.json();
}
