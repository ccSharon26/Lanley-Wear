// frontend/lib/api.js
import { API_BASE_URL } from "./config";

export async function fetchJSON(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}
