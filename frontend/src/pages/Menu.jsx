import MenuNav from '../components/MenuNav';
import FoodCard from './../components/FoodCard';
import FoodCardPortrait from '../components/FoodCardPortrait';
import HighlightCard from '../components/HighlightCard';

function Menu() {
  return (
    <>
      <h1>Menu</h1>
      <p>Tosi hyvä iskulause tähän</p>
      <br />
      <MenuNav />
      <br />
      <HighlightCard />
      <FoodCard />
      <FoodCardPortrait />
    </>
  );
}
export default Menu;
