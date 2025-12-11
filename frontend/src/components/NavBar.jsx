import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHook';
import {useLanguage} from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import {useEffect, useState} from 'react';
import { useOrderContext } from '../hooks/contextHook';


function NavBar() {
  const {handleAutoLogin, user} = useUserContext();
  const {cart, calculateQuantity} = useOrderContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const {strings} = useLanguage();
  const [quantity, setQuantity] = useState(calculateQuantity());

  useEffect(() => {
    handleAutoLogin();
  }, []);

  useEffect(() => {
    setIsAdmin(user?.role === 'admin');
  }, [user]);

  useEffect(() => {
    calculateQuantity();
  }, [cart])

  return (
    <nav className="navbar h-16 top-0 bg-[#FFFFFF] flex items-center justify-center sticky border-b z-1000 w-full max-xs:overflow-x-scroll  max-xs:whitespace-nowrap">
      <div className="navbar-links">
        <ul className="flex flex-row items-center [&>li]:text-black font-medium [&>li]:decoration-inherit">
          <li>
            <Link to="/" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
              {strings.nav.home}
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
              {strings.nav.menu}
            </Link>
          </li>

          {user && isAdmin && (
            <>
              <li>
                <Link to="/admin" className="nav-link hover:text-stone-500!  max-sm:p-1.5!">
                  {strings.nav.admin}
                </Link>
              </li>
              <li>
                <Link to="/history" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
                  {strings.nav.history}
                </Link>
              </li>
            </>
          )}

          {user ? (
            <>
              <li>
                <Link to="/profile" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
                  {strings.nav.profile}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
                  {strings.nav.login}
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
              {strings.nav.cart}
            </Link>
          </li>

          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
