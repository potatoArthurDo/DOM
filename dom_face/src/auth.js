import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export function getUserIdFromToken() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.user_id || decoded.id || null;
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}
