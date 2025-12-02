import MenuNav from '../components/menu/MenuNav';
import FoodCard from '../components/menu/FoodCard';
import FoodCardPortrait from '../components/menu/FoodCardPortrait';
import HighlightCard from '../components/menu/HighlightCard';
import Mains from "../components/menu/Mains";
import Snacks from "../components/menu/Snacks";
import Desserts from "../components/menu/Desserts";
import Drinks from "../components/menu/Drinks";

function Menu() {
  
  // TODO: hae kaikki ruoat tietokannasta, näytä kaikki menussa
  // TODO: näytä ruokalajit kategorian mukaan, conditional rendering

  return (
    <>
      <h1>Menu</h1>
      <p>Tosi hyvä iskulause tähän</p>
      <br />
      <MenuNav />
      <br />
      <div className='menu-sections'>
        <Mains />
        <Snacks />
        <Desserts />
        <Drinks/>
      </div>
      
      <HighlightCard />
      <FoodCard />
      {/*<FoodCardPortrait />*/}
    </>
  );
}
export default Menu;
