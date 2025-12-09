import {Link} from 'react-router';
import {useLanguage} from '../../hooks/useLanguage';

const MenuNav = () => {
  const {strings} = useLanguage();
  return (
    <>
      <ul className="flex flex-row gap-5">
        <li>
          <Link to="/menu">{strings.menu.all}</Link>
        </li>
        <li>
          <Link to="/menu/mains">{strings.menu.mains}</Link>
        </li>
        <li>
          <Link to="/menu/snacks">{strings.menu.snacks}</Link>
        </li>
        <li>
          <Link to="/menu/desserts">{strings.menu.desserts}</Link>
        </li>
        <li>
          <Link to="/menu/drinks">{strings.menu.drinks}</Link>
        </li>
      </ul>
    </>
  );
};

export default MenuNav;
