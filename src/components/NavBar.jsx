import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header>
      <Link to="/">
        <img src="https://i.postimg.cc/qRf5GrN5/DISC-Project-Muse-(1).png" alt="Muse Logo" />
      </Link>
      <nav>
        <ul>
        <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
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
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={location.pathname === '/login' ? 'active' : ''}
                >
                  login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className={location.pathname === '/signup' ? 'active' : ''}
                >
                  signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn">
          <img src="https://i.postimg.cc/qhqjFr5T/Material-Symbols-Logout-Icon.png" alt="Logout Icon" />
        </button>
      )}
    </header>
  );
}

export default NavBar;
