import FoodCard from './FoodCard';
import FoodCardPortrait from './FoodCardPortrait';
import HighlightCard from './HighlightCard';
import { useMenu } from '../../hooks/apiHook';

function Drinks() {
  const { menuArray } = useMenu();
  
  
  console.log(menuArray);
    return(
        <>
          <h1>Drinks</h1>
          <FoodCard />
        </>
    )
};
export default Drinks;