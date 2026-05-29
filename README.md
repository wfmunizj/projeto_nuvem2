# 🎬 Catálogo de Filmes

> Projeto desenvolvido para a disciplina de **Serviços em Nuvem** — Universidade Presbiteriana Mackenzie

---

## 👥 Integrantes

| Nome | RA |
|------|----|
| Ana Julia | 10438692 |
| Estephany Silva | 10445065 |
| Wellington | 10389854 |

---

## 📋 Descrição

Aplicação web full-stack para gerenciamento de um catálogo de filmes. Permite cadastrar, visualizar, editar, excluir e gerar relatórios dos filmes. O backend expõe uma API REST e o frontend é uma SPA Vue 3, ambos implantados em uma instância AWS EC2 com banco de dados PostgreSQL.

---

## 🏗️ Arquitetura

```
┌─────────────────────┐        HTTP/REST        ┌──────────────────────┐        JDBC        ┌──────────────┐
│   Frontend (Vue 3)  │  ────────────────────►  │  Backend (Spring)    │  ───────────────►  │  PostgreSQL  │
│   Porta: 5173/80    │                          │  Porta: 8080         │                    │  AWS EC2     │
└─────────────────────┘                          └──────────────────────┘                    └──────────────┘
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Backend | Spring Boot | 4.0.6 |
| Backend | Java | 21 |
| Backend | Spring Data JPA | — |
| Backend | Lombok | — |
| Backend | PostgreSQL Driver | — |
| Frontend | Vue.js | 3.5 |
| Frontend | Vue Router | 4.4 |
| Frontend | Vite | 5.4 |
| Infra | AWS EC2 | — |
| Banco | PostgreSQL | — |

---

## ✅ Funcionalidades

- 📋 Listar todos os filmes cadastrados
- 🔍 Buscar filme por título
- ➕ Cadastrar novo filme
- ✏️ Editar informações de um filme
- 🗑️ Excluir filme
- 📊 Visualizar relatório dos filmes

---

## 🌐 Endpoints da API

Base URL: `http://<host>:8080`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/filmes` | Lista todos os filmes |
| `GET` | `/filmes/{titulo}` | Busca filme pelo título |
| `POST` | `/filmes` | Cadastra novo filme |
| `PUT` | `/filmes/{titulo}` | Atualiza filme pelo título |
| `DELETE` | `/filmes/{titulo}` | Remove filme pelo título |

### Modelo de Filme

```json
{
  "titulo": "Interestelar",
  "ano": 2014,
  "duracao": 169,
  "sinopse": "Um grupo de astronautas viaja...",
  "notaMedia": 8.6,
  "genero": "Ficção Científica"
}
```

---

## 🚀 Como Executar

### Pré-requisitos

- Java 21+
- Maven (ou use o wrapper `mvnw`)
- Node.js 18+
- PostgreSQL rodando e acessível

### Backend

```bash
cd backend

# Defina as variáveis de ambiente do banco
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=catalogo_filmes
export DB_USER=postgres
export DB_PASSWORD=sua_senha

# Execute
./mvnw spring-boot:run
```

> No Windows: `mvnw.cmd spring-boot:run`

API disponível em `http://localhost:8080`

### Frontend

```bash
cd frontend

npm install

# Crie o arquivo .env (opcional, aponta para o backend)
echo "VITE_API_BASE_URL=http://localhost:8080" > .env

npm run dev
```

App disponível em `http://localhost:5173`

---

## 🔧 Variáveis de Ambiente

### Backend (`application.properties`)

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DB_HOST` | Host do banco PostgreSQL | — |
| `DB_PORT` | Porta do banco PostgreSQL | `5432` |
| `DB_NAME` | Nome do banco de dados | — |
| `DB_USER` | Usuário do banco | — |
| `DB_PASSWORD` | Senha do banco | — |

### Frontend (`.env`)

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_BASE_URL` | URL base da API backend | `""` (mesmo host) |

---

## 📁 Estrutura de Pastas

```
projeto_nuvem2/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/br/mackenzie/backend/
│   │       │   ├── BackendApplication.java
│   │       │   ├── controller/
│   │       │   │   └── FilmeController.java
│   │       │   ├── entities/
│   │       │   │   └── Filme.java
│   │       │   └── repositories/
│   │       │       └── FilmeRepository.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── filmes.js
    │   ├── components/
    │   │   ├── FilmeCard.vue
    │   │   ├── FilmeForm.vue
    │   │   ├── ConfirmModal.vue
    │   │   ├── Spinner.vue
    │   │   └── Toast.vue
    │   ├── composables/
    │   │   ├── useFilmes.js
    │   │   └── useToast.js
    │   ├── router/
    │   │   └── index.js
    │   ├── views/
    │   │   ├── ListaFilmes.vue
    │   │   ├── DetalhesFilme.vue
    │   │   ├── FormFilme.vue
    │   │   └── Relatorio.vue
    │   └── main.js
    ├── index.html
    ├── vite.config.js
    └── package.json
```
