# Simple Task Manager

A full-stack Task Manager application built with the MERN stack, featuring a modular Express REST API connected to MongoDB Atlas and a React frontend powered by Redux Toolkit and Tailwind CSS.

## Tech Stack

- **Fronten:** React (Vite), Redux Toolkit (`createSlice`, `createAsyncThunk`), Tailwind CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas

## Features

- Full CRUD functionality (Create, Read, Update, Replace, and Delete tasks)
- Filter tasks by **All**, **Done**, and **Pending** with a live completion counter
- Global state management with Redux Toolkit and a separated API service layer
- Modular Express MVC backend with custom `AppError` handling, middleware, and input validators
- Responsive dark UI styled with Tailwind CSS

## Project Structure

```text
Project-2/
|-- client-Side/                # React + Vite + Redux Toolkit + Tailwind CSS
|   |-- public/                 # Static assets & favicon
|   |-- src/
|   |   |-- api/                # Fetch API service layer
|   |   |-- redux/              # Redux store & todosSlice
|   |   |-- ...
|   |-- index.html
|   |-- vite.config.js
|-- server/                     # Node.js + Express + Mongoose API
|   |-- config/                 # Database connection setup
|   |-- controllers/            # Route handler logic
|   |-- middleware/             # Custom Express & error-handling middleware
|   |-- models/                 # Mongoose schemas
|   |-- routes/                 # API route definitions
|   |-- validators/             # Request payload validation helpers
|   |-- .env.example/           # Environment variable template
|   |-- app.js                  # Express app configuration
|   |-- errors.js               # Custom AppError class
|   |-- requests.http           # REST Client API test file
|   |-- server.js               # Server entry point
|-- README.md
```

## API Endpoints

| Method | Endpoint | Description |
| | | |
| `GET` | `/api/todos` | Fetch all todos (newest first)
| `GET` | `/api/todos/:id` | Fetch a single todo by ID |
| `POST` | `/api/todos` | Create a new todo (`{ "text": "..."}`) |
| `PATCH`| `/api/todos/:id`| Partially update `text` or `done` status |
| `PUT` | `/api/todos/:id` | Replace both `text` and `done` fields |
| `DELETE` | `/api/todos/:id` | Delete a todo (`204 No Content`) |

## Run Locally

### 1. Clone the repository

```bash
git clone [https://github.com/PAGUTHARIVAN/Task-Manager.git](https://github.com/PAGUTHARIVAN/Task-Manager.git)
cd Porject-2
```

### 2. Setup & Run the Server

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in your MongoDB Atlas URI and port (`PORT=5001`), then start the backend:

```bash
node server.js
```

### 3. Setup & Run the Client

Open a second terminal from the root folder

```bash
cd client-Side
npm install
npm run dev

Open `http://localhost:5173` in your browser. You can also test API endpoints directly using `server/requests.http` with the VS Code REST Client extension.
```
