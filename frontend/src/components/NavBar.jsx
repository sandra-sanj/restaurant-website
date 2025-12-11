import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHook';
import {useLanguage} from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import {useEffect, useState} from 'react';
import { useOrderContext } from '../hooks/contextHook';
import { motion } from "framer-motion";


function NavBar() {
  const {handleAutoLogin, user} = useUserContext();
  const {cart, calculateQuantity} = useOrderContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const {strings} = useLanguage();
  const [quantity, setQuantity] = useState(calculateQuantity());

  //{strings.nav.cart} this is cart text in english and in finnish


  useEffect(() => {
    handleAutoLogin();
  }, []);

  useEffect(() => {
    setIsAdmin(user?.role === 'admin');
  }, [user]);

  useEffect(() => {
      setQuantity(calculateQuantity());
      console.log(cart);
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
            <LanguageSwitcher />
          </li>

          <li>
            <div className='.cart-div'>
              <Link to="/cart" className="nav-link hover:text-stone-500! max-sm:p-1.5!">
              <motion.div
                key={quantity} 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="relative inline-block w-8 h-8"
              >


                <img 
                src='/cartImg.png' 
                alt='shopping cart'
                className="w-full h-full"
                />
                <motion.sup
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 inline-block"
                  >
                    
                  {quantity}
              </motion.sup>
              </motion.div>
                

              </Link>
            </div>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
