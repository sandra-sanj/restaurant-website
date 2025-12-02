import { Link } from "react-router";

const MenuNav = () => {
  return (
    <>
      <ul className="flex flex-row gap-5">
        <li>
          <Link to="/">Kaikki</Link>
        </li>
        <li>
          <Link to="/mains">Pääruoat</Link>
        </li>
        <li>
          <Link to="/snacks">Snacks</Link>
        </li>
        <li>
          <Link to="/desserts">Desserts</Link>
        </li>
        <li>
          <Link to="/drinks">Drinks</Link>
        </li>
      </ul>
    </>
  );
};

export default MenuNav;
