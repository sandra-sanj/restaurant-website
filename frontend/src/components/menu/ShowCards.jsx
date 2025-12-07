import FoodCard from './FoodCard';
import Info from './Info';
import { useMenu } from '../../hooks/apiHook';
import { useState } from 'react';
import AddToCart from '../shoppingcart/AddToCart';

function ShowCards(props) {
  const [selectedItem, setSelectedItem] = useState(null);

  const { menuArray, loading, error } = useMenu();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  
  let section = menuArray.filter(item => item.category_id === props.category_id);
  console.log(section);

  if (!props.category_id) {
    section = menuArray;
  }

    return(
        <>
          <AddToCart item={selectedItem} setSelectedItem={setSelectedItem} />

          {section.map((item) => (
            <FoodCard 
              key={item.menu_item_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </>
    )
};
export default ShowCards;