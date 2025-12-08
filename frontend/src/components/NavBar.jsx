import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHook';
import {useEffect} from 'react';
import {useState} from 'react';

function NavBar() {
  const {handleAutoLogin, user} = useUserContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  useEffect(() => {
    setIsAdmin(user?.role === 'admin');
  }, [user]);
  

  return (
    <nav className="navbar h-12">
      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home{' '}
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link">
              Menu{' '}
            </Link>
          </li>

          {user && isAdmin && (
              <>
                <li>
                  <Link to="/admin" className="nav-link">
                    Admin{' '}
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="nav-link">
                    History{' '}
                  </Link>
                </li>
              </>,
            )}

          {user ? (
            <>
              <li>
                <Link to="/profile" className="nav-link">
                  Profile{' '}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  LogIn{' '}
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" className="nav-link">
              Cart{' '}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
