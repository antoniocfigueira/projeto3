## Projeto 3 Integração Frontend + Backend

## António Figueira

## Repositório GitHub

* Link: https://github.com/antoniocfigueira/projeto3

## Como executar o projeto

1. Clonar o repositório:

   ```bash
   git clonehttps://github.com/antoniocfigueira/projeto3.git
   ```

2. Entrar na pasta do projeto:

   ```bash
   cd projeto3
   ```

---

## Backend

3. Entrar na pasta do backend:

   ```bash
   cd backend
   ```

4. Instalar dependências:

   ```bash
   npm install
   ```

5. Executar o backend:

   ```bash
   npm start
   ```

Servidor disponível em:

```
http://localhost:3000
```

---

## Frontend

6. Abrir novo terminal e entrar na pasta do frontend:

   ```bash
   cd frontend
   ```

7. Instalar dependências:

   ```bash
   npm install
   ```

8. Executar o frontend:

   ```bash
   npm start
   ```

---

## Base de Dados

9. Abrir MySQL Workbench
10. Criar a base de dados e executar as tabelas
11. Garantir que a ligação no db.js está correta

---

## Principais decisões tomadas

O projeto foi organizado em:

Controllers: recebem pedidos e retornam respostas
Services: contêm lógica e queries SQL
API: faz chamadas HTTP com fetch

 Esta separação melhora a organização e manutenção.

## Sincronização de dados

Após qualquer operação (POST, PUT, DELETE), é feita a sincronização com:

await loadTasks();
await loadUsers();

Garante que o frontend está sempre atualizado com a base de dados.

## Uso de fetch para comunicação

Foram criados ficheiros na pasta api/ para centralizar chamadas HTTP:

apiTaskService.ts
apiUserService.ts
apiTagService.ts

 Isto permite reutilização e organização do código.