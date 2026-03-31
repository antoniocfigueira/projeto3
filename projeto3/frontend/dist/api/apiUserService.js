const BASE_URL = 'http://localhost:3000';
export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok)
        throw new Error("Erro ao buscar users");
    return res.json();
}
export async function createUser(user) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (!res.ok)
        throw new Error("Erro ao criar user");
    return res.json();
}
