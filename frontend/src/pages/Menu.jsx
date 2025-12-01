import MenuNav from '../components/menu/MenuNav';
import FoodCard from '../components/menu/FoodCard';
import FoodCardPortrait from '../components/menu/FoodCardPortrait';
import HighlightCard from '../components/menu/HighlightCard';

function Menu() {
  
  // TODO: hae kaikki ruoat tietokannasta, näytä kaikki menussa
  // TODO: näytä ruokalajit kategorian mukaan

  return (
    <>
      <h1>Menu</h1>
      <p>Tosi hyvä iskulause tähän</p>
      <br />
      <MenuNav />
      <br />
      
      <HighlightCard />
      <FoodCard />
      {/*<FoodCardPortrait />*/}
    </>
  );
}
export default Menu;
