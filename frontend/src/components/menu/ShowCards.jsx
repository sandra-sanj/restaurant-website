import FoodCard from './FoodCard';
import {useMenu} from '../../hooks/apiHook';
import {useLanguage} from '../../hooks/useLanguage';
import {useState} from 'react';
import AddToCart from '../shoppingcart/AddToCart';
import { useParams } from 'react-router';

function ShowCards(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const {itemId} = useParams();

  const {menuArray, loading, error} = useMenu();
  const {language} = useLanguage();


  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  let section = menuArray.filter(
    (item) => item.category_id === props.category_id,
  );

  if (itemId) {
    let itemById = menuArray.filter((item) => 
      item.menu_item_id === itemId,
    )
    setSelectedItem(itemById);
  }


  if (!props.category_id) {
    section = menuArray;
  }

  return (
    <>
      <AddToCart item={selectedItem} setSelectedItem={setSelectedItem} />

      {section
        .filter((item) => item.is_available)
        .map((item) => (
          <FoodCard
            key={item.menu_item_id}
            item={item}
            setSelectedItem={setSelectedItem}
            language={language} //Pass language to FoodCard
          />
        ))}
    </>
  );
}
export default ShowCards;
