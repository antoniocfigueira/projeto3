const BASE_URL = 'http://localhost:3000';

export async function getTags() {
  const res = await fetch(`${BASE_URL}/tags`);
  if (!res.ok) throw new Error("Erro ao buscar tags");
  return await res.json();
}

export async function createTag(tag: any) {
  const res = await fetch(`${BASE_URL}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag)
  });

  if (!res.ok) throw new Error("Erro ao criar tag");
}

export async function deleteTag(id: number) {
  const res = await fetch(`${BASE_URL}/tags/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Erro ao apagar tag");
}