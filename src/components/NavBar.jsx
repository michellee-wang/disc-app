function NavBar({ currentPage, onPageChange }) {
  return (
    <header>
      <img src="https://i.postimg.cc/sX9qvDP1/DISC-Project-Muse.png" alt="Muse Logo" />
      <nav>
        <ul>
          <li>
            <a 
              href="#" 
              className={currentPage === 'discover' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onPageChange('discover'); }}
            >
              discover
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'saved' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onPageChange('saved'); }}
            >
              saved
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'profile' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onPageChange('profile'); }}
            >
              profile
            </a>
          </li>
        </ul>
      </nav>
      <div className="profile-icon">
        <a href="#">
          <img src="https://i.postimg.cc/qhqjFr5T/Material-Symbols-Logout-Icon.png" alt="Logout Icon" />
        </a>
      </div>
    </header>
  );
}

export default NavBar;

