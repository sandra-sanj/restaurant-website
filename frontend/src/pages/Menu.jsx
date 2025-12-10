import MenuNav from '../components/menu/MenuNav';
import { Outlet, Route , Routes } from 'react-router';

function Menu() {

  return (
    <>
      <h1>Menu</h1>
      <p>Tosi hyvä iskulause tähän</p>
      <br />
      <MenuNav />
      <br />
      <div className='menu-sections'>
        <Outlet></Outlet>
      </div>
      

      {/*<FoodCardPortrait />*/}
    </>
  );
}
export default Menu;
