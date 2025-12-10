import {Link} from 'react-router';
import {useLanguage} from '../../hooks/useLanguage';
import {NavLink} from 'react-router-dom';
import {useLocation} from 'react-router';

const MenuNav = () => {
  const {strings} = useLanguage();
  const location = useLocation();

  return (
    <div className="mb-5">
      <ul className="flex flex-col text-sm sm:text-base sm:flex-row gap-0 sm:gap-5 p-0! bg-[#982A2A] text-white rounded-4xl">
        <div className="p-2">
          <li className="rounded-3xl p-0!">
            <NavLink
              to="/menu"
              className={() =>
                location.pathname.endsWith('/menu')
                  ? 'border-white border rounded-3xl'
                  : 'border-[#982A2A] border rounded-3xl hover:border-white'
              }
            >
              {strings.menu.all}
            </NavLink>
          </li>
        </div>

        <div className="p-2">
          <li className="rounded-3xl p-0!">
            <NavLink
              to="/menu/mains"
              className={() =>
                location.pathname.endsWith('/menu/mains')
                  ? 'border-white border rounded-3xl'
                  : 'border-[#982A2A] border rounded-3xl hover:border-white'
              }
            >
              {strings.menu.mains}
            </NavLink>
          </li>
        </div>

        <div className="p-2">
          <li className="rounded-3xl p-0!">
            <NavLink
              to="/menu/snacks"
              className={() =>
                location.pathname.endsWith('/menu/snacks')
                  ? 'border-white border rounded-3xl'
                  : 'border-[#982A2A] border rounded-3xl hover:border-white'
              }
            >
              {strings.menu.snacks}
            </NavLink>
          </li>
        </div>

        <div className="p-2">
          <li className="rounded-3xl p-0!">
            <NavLink
              to="/menu/desserts"
              className={() =>
                location.pathname.endsWith('/menu/desserts')
                  ? 'border-white border rounded-3xl'
                  : 'border-[#982A2A] border rounded-3xl hover:border-white'
              }
            >
              {strings.menu.desserts}
            </NavLink>
          </li>
        </div>

        <div className="p-2">
          <li className="rounded-3xl p-0!">
            <NavLink
              to="/menu/drinks"
              className={() =>
                location.pathname.endsWith('/menu/drinks')
                  ? 'border-white border rounded-3xl'
                  : 'border-[#982A2A] border rounded-3xl hover:border-white'
              }
            >
              {strings.menu.drinks}
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default MenuNav;
