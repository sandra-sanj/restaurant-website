import FoodCard from './FoodCard';
import { useMenu } from '../../hooks/apiHook';
import { useState } from 'react';
import AddToCart from '../shoppingcart/AddToCart';
import HighlightCard from './HighlightCard';
import InfoCard from './InfoCard';

function ShowCards(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [info, setInfoOpen] = useState(null);

  const { menuArray, loading, error } = useMenu();

  if (loading) return;
  if (error) return <p>Error: {error}</p>;
  
  
  let section = menuArray.filter(item => item.category_id === props.category_id);

  if (!props.category_id) {
    section = menuArray;
  }

    return(
        <>
          <AddToCart item={selectedItem} setSelectedItem={setSelectedItem} />
          <InfoCard info={info} setInfoOpen={setInfoOpen}></InfoCard>
          
          {section.map((item) => (
            <FoodCard 
              key={item.menu_item_id}
              item={item}
              setSelectedItem={setSelectedItem}
              info={info}
              setInfoOpen={setInfoOpen}
            />
          ))}
          
        </>
    )
};
export default ShowCards;