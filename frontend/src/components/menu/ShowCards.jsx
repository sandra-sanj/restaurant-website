import FoodCard from './FoodCard';
import {useMenu} from '../../hooks/apiHook';
import {useLanguage} from '../../hooks/useLanguage';
import {useState} from 'react';
import AddToCart from '../shoppingcart/AddToCart';

function ShowCards(props) {
  const [selectedItem, setSelectedItem] = useState(null);

  const {menuArray, loading, error} = useMenu();
  const {language} = useLanguage();

  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  let section = menuArray.filter(
    (item) => item.category_id === props.category_id,
  );

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
