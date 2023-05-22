import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import githubswole from "../../images/githubswole.png";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut(); // Remove token from local storage
    setUser(null); // Nullify user state
  }

  return (
    <div className="nav">
      <nav className="display-txt">
        {user && <span> Welcome, {user.name}!</span>}
        &nbsp; &nbsp;&nbsp; &nbsp;
        <Link to="" onClick={handleLogOut} className="link">
          Log Out
        </Link>
      </nav>
      <img src={githubswole} alt="logo" className="logo" />
    </div>
  );
}
