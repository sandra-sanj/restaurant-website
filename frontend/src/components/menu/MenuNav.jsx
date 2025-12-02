import { Link } from "react-router";

const MenuNav = () => {
  return (
    <>
      <ul className="flex flex-row gap-5">
        <li>
          <Link to="/menu">Kaikki</Link>
        </li>
        <li>
          <Link to="/menu/mains">Pääruoat</Link>
        </li>
        <li>
          <Link to="/menu/snacks">Snacks</Link>
        </li>
        <li>
          <Link to="/menu/desserts">Desserts</Link>
        </li>
        <li>
          <Link to="/menu/drinks">Drinks</Link>
        </li>
      </ul>
    </>
  );
};

export default MenuNav;
