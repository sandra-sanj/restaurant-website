import MenuNav from '../components/menu/MenuNav';
import FoodCard from '../components/menu/FoodCard';
import FoodCardPortrait from '../components/menu/FoodCardPortrait';
import HighlightCard from '../components/menu/HighlightCard';
import Mains from "../components/menu/Mains";
import Snacks from "../components/menu/Snacks";
import Desserts from "../components/menu/Desserts";
import Drinks from "../components/menu/Drinks";
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
