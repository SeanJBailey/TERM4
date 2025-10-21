// src/api/authFetch.js
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const headers = {
    ...options.headers,
    "Authorization": `Bearer ${token}`,
  };

  // Only add JSON Content-Type if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 403) throw new Error("Forbidden: invalid token or access denied");
    if (response.status === 401) throw new Error("Unauthorized: login required");
    throw new Error(`HTTP error ${response.status}`);
  }

  // If response has content, parse it as JSON, else return empty object
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
