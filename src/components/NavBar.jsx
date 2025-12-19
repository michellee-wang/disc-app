import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation();
  
  return (
    <header>
      <Link to="/">
        <img src="https://i.postimg.cc/qRf5GrN5/DISC-Project-Muse-(1).png" alt="Muse Logo" />
      </Link>
      <nav>
        <ul>
        <li>
            <Link 
              to="/#" 
              className={location.pathname === '/#' ? 'active' : ''}
            >
              home
            </Link>
          </li>
          <li>
            <Link 
              to="/discover" 
              className={location.pathname === '/discover' ? 'active' : ''}
            >
              discover
            </Link>
          </li>
          <li>
            <Link 
              to="/saved" 
              className={location.pathname === '/saved' ? 'active' : ''}
            >
              saved
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={location.pathname === '/profile' ? 'active' : ''}
            >
              profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="profile-icon">
        <Link to="/logout">
          <img src="https://i.postimg.cc/qhqjFr5T/Material-Symbols-Logout-Icon.png" alt="Logout Icon" />
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
