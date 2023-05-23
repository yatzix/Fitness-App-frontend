import * as userAPI from "./users-api";

export function logOut() {
  localStorage.removeItem("token");
}

export async function signUp(userData) {
  // passes in form fata from SignUpForm.js
  const token = await userAPI.signUp(userData); // creates unique token for user, refer to users-api.js
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await userAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  // Attempt to get token from localStorage
  const token = localStorage.getItem("token");
  if (!token) return null;
  // If a token is retrieved
  // Decode the payload from the token so we can check if it's still valid
  const payload = JSON.parse(atob(token.split(".")[1]));
  // I.e., check if it's expired
  if (payload.exp < Date.now() / 1000) {
    // Remove token from localStorage if expired
    localStorage.removeItem("token");
    return null;
  }
  // If token is still valid, token is returned
  return token;
}

export function checkToken() {
  return userAPI.checkToken().then((dateStr) => new Date(dateStr));
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}
