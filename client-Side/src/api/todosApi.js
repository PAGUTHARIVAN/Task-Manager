//BASE URL
const API_URL = "http://localhost:5001/api/todos";

//GET
export const getAllTodos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return await res.json();
};

//CREATE
export const createTodo = async (text) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return await res.json();
};

//UPDATE
export const updateTodoStatus = async (taskId, toggleDone) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: taskId, done: toggleDone }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return await res.json();
};

//DELETE
export const deleteTodo = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return true;
};
