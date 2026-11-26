//AUTH_URL
const AUTH_URL = import.meta.env.VITE_AUTH_URL;

//HandleResponse, Defensive Response & Error Extractor
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "Authentication failed");
  }
  return data;
};

//registerUser
export const registerUser = async ({ name, email, password }) => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};
//loginUser
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};
