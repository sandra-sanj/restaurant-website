import MenuNav from '../components/menu/MenuNav';
import {Outlet, Route, Routes} from 'react-router';

function Menu() {
  return (
    <>
      <h1 className="m-5">Menu</h1>
      <MenuNav />
      <div className="menu-sections grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
        <Outlet></Outlet>
        <br />
      </div>
    </>
  );
}
export default Menu;
