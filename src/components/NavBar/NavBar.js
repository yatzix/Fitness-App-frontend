import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import githubswole from "../../images/githubswole.png";
import styles from "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut(); // Remove token from local storage
    setUser(null); // Nullify user state
  }

  return (
    <div className="nav">
      <nav className="display-txt">
        {/* <Link to="/" className="link">
          Home
        </Link> */}
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/WorkOuts" className="link">
          Create Workout
        </Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
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
