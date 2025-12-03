import FoodCard from './FoodCard';
import { useMenu } from '../../hooks/apiHook';
import { useState } from 'react';

function Drinks() {
const [selectedItem, setSelectedItem] = useState(null);

  const { menuArray, loading, error } = useMenu();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const drinks = menuArray.filter(item => item.category_id === 4);
  console.log(drinks);
    return(
        <>
          <h1>Drinks</h1>
          {drinks.map((item) => (
            <FoodCard 
              key={item.menu_item_id}
              item={item}
              selectedItem={selectedItem}
            />
          ))}
        </>
    )
};
export default Drinks;