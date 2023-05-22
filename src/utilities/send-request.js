import { getToken } from "./users-service";

// SEND REQUEST FN SENDS A FETCH REQ TO THE SERVER TO PERFORM CRUD
export default async function sendRequest(url, method = "GET", payload = null) {
  // params above ^ are defaulted
  //Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method }; // fetch sends the options object to the server that includes details of the request
  if (payload) {
    // payload for signUp is the info from formData
    options.headers = { "Content-Type": "application/json" }; // creates a headers property within options obj
    options.body = JSON.stringify(payload); // creates a body property within options obj and converts it to JSON
  }

  const token = getToken(); // once token is created, add a Authorization property within the headers that includes Bearer
  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options); // if all goes well, server will send a response back to the client and return it in JSON format
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}

// A bearer token is a type of access token commonly used for authentication and authorization in APIs. It is typically included in the Authorization header of HTTP requests
