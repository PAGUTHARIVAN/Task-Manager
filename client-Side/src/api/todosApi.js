//API_URL
const API_URL = import.meta.env.VITE_TODO_URL;

const getAuthHeaders = (includeJson = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const getAllTodos = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await res.json();
};

export const createTodo = async (text) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    throw new Error("Failed to create todo.");
  }
  return await res.json();
};

export const updateTodoStatus = async (taskId, toggleDone) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ id: taskId, done: toggleDone }),
  });
  if (!res.ok) {
    throw new Error("Failed to update todo.");
  }
  return await res.json();
};

export const deleteTodo = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to delete todo.");
  }
  return true;
};
