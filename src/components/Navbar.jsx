import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Task Tracker
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add-task"
              className={location.pathname === '/add-task' ? 'active' : ''}
            >
              Add Task
            </Link>
          </li>
          <li>
            <Link
              to="/completed-tasks"
              className={location.pathname === '/completed-tasks' ? 'active' : ''}
            >
              Completed Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
