import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({ user, setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);

      setUser(user);
    } catch (error) {
      setError("Log In Failed - Try Again");
    }
  }

  useEffect(() => {
    const foundUser = async () => {
      try {
        const token = await usersService.getToken();
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            user: user.id,
          },
        });
        const data = await response.json();
        setfoundUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    foundUser();
  }, []);

  const [foundUser, setfoundUser] = useState(null);

  const API_URL = "https://sleepy-meadow-61708.herokuapp.com/api/users/login";

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button className="auth-btn" type="submit">
            LOG IN
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
