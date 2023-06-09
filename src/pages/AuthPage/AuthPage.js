import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import githubswole from "../../images/githubswole.png";
import "./AuthPage.css";
import { useState } from "react";

export default function AuthPage({ setUser, user }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      <div className="bg-image"></div>
      <div className="bg-text">
        <h1 className="name">FitHub</h1>
        <img src={githubswole} alt="logo" className="logo" />
        <h5 className="commit">Make Your Initial Commit</h5>
        {showLogin ? (
          <LoginForm setUser={setUser} user={user} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
        <h3>Are you a User?</h3>
        <button className="auth-btn" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "SIGN UP" : "LOG IN"}
        </button>
      </div>
    </div>
  );
}
