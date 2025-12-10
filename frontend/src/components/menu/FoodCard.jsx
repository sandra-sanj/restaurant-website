import {useEffect, useState} from 'react';
import {useLanguage} from '../../hooks/useLanguage';
import Modal from '../Modal';
import {useAllergen} from '../../hooks/apiHook';

const FoodCard = (props) => {
  const {item, setSelectedItem} = props;
  const {language, strings} = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const {getAllergen} = useAllergen();
  const [allergens, setAllergens] = useState();

  const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

  useEffect(() => {
    const res = getAllergen(item.menu_item_id);
    setAllergens(res.name);
  }, [item]);

  // Get name and description in correct language
  const displayName = language === 'en' ? item.name_en : item.name;
  const displayDescription =
    language === 'en' ? item.description_en : item.description;

  return (
    <>
      <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-2 outline-gray-400">
        <img
          src={API_UPLOADS_URL + item.image_thumb_url}
          alt={displayDescription}
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>{displayName}</h2>
          <button onClick={() => setShowModal(true)}>i</button>
        </div>

        <p>{displayDescription}</p>
        <p>{item.price}</p>
        <button onClick={() => setSelectedItem(item)}>
          {strings.cart.addToCart}
        </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <div>
            <h2 className="font-bold">{strings.menu.ingredients}</h2>
            <p>{item.ingredients}</p>
            <p>
              {strings.menu.allergens}: {allergens}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

//<Link to='/addtocard'A></Link>
export default FoodCard;
