import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import githubswole from "../../images/githubswole.png";
import styles from "./AuthPage.css";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      <div className="bg-image"></div>
      <div className="bg-text">
        <h1 className="name">FitHub</h1>
        <img src={githubswole} alt="logo" className="logo" />
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
        <h3>Are you a User?</h3>
        <button class="auth-btn" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "SIGN UP" : "LOG IN"}
        </button>
      </div>
    </div>
  );
}
