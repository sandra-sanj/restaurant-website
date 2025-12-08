import {Link} from "react-router";
import { useUserContext } from "../hooks/contextHook";
import {useLanguage} from '../hooks/useLanguage';
import { useEffect } from "react";
import {useState} from 'react';

function NavBar() {
    const { handleAutoLogin, user} = useUserContext();
    const [isAdmin, setIsAdmin] = useState(false);
    const {language, toggleLanguage, strings} = useLanguage();


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
              {strings.nav.home}
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link">
              {strings.nav.menu}
            </Link>
          </li>

          {user && isAdmin && (
              <>
                <li>
                  <Link to="/admin" className="nav-link">
                    {strings.nav.admin}
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="nav-link">
                    {strings.nav.history}
                  </Link>
                </li>
              </>
            )}
  

          {user ? (
            <>
              <li>
                <Link to="/profile" className="nav-link">
                  {strings.nav.profile}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  {strings.nav.login}
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" className="nav-link">
              {strings.nav.cart}
            </Link>
          </li>

          <li>
            <button onClick={toggleLanguage} className="nav-link">
              {language === 'fi' ? '🇬🇧 EN' : '🇫🇮 FI'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
