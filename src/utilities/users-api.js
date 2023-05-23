import sendRequest from "./send-request";
const BASE_URL = "https://sleepy-meadow-61708.herokuapp.com/api/users";

export async function signUp(userData) {
  // passes in formData and sends a post req to the servers
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
