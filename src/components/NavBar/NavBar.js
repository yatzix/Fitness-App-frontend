import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut(); // Remove token from local storage
        setUser(null); // Nullify user state
    };

    return (
        <nav>
            <Link to='/'>Home</Link>
            &nbsp; | &nbsp;
            <Link to="/WorkOuts">Workouts</Link>
            &nbsp; | &nbsp;
            {user && <span> &nbsp; Welcome, {user.name}!</span>}
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}