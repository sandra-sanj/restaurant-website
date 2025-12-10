import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook';
import AddToCart from '../shoppingcart/AddToCart';
import Modal from '../Modal';
import {useAllergen} from '../../hooks/apiHook';
import {useLanguage} from '../../hooks/useLanguage';

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const HighlightCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {getAllergen} = useAllergen();
  const [allergens, setAllergens] = useState([]);
  const [codes, setCodes] = useState([]);

  const {todaysLunch, error} = useMenu();
  //console.log(todaysLunch);
  const {language, strings} = useLanguage();

  useEffect(() => {
    const handleAllergens = async () => {
      const response = await getAllergen(todaysLunch.menu_item_id);
      console.log('res: ', response);
      const allergen = response.map((a) => a.name);
      const code = response.map((c) => c.code);
      setAllergens(allergen);
      setCodes(code);
      console.log(allergen, codes);
    };

    handleAllergens();
  }, [todaysLunch]);

  if (error) return <p>Error: {error}</p>;

  // Get name and description in correct language
  const displayName = todaysLunch
    ? language === 'en'
      ? todaysLunch.name_en
      : todaysLunch.name
    : '';
  const displayDescription = todaysLunch
    ? language === 'en'
      ? todaysLunch.description_en
      : todaysLunch.description
    : '';

  return (
    <>
      {todaysLunch && (
        <div>
          <AddToCart item={selectedItem} setSelectedItem={setSelectedItem} />
          <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-10 outline-red-800">
            <img
              src={API_UPLOADS_URL + todaysLunch.image_thumb_url}
              alt={displayDescription}
              width={'auto'}
              className="rounded-md"
            />
            <div>
              <h2>{displayName}</h2>
              <p>{strings.menu?.lunchSpecial || 'Päivän lounas'}</p>
              <button onClick={() => setShowModal(true)}>i</button>
            </div>

            <p>{displayDescription}</p>
            <p>{todaysLunch.special_price}</p>
            <p className="text-decoration-line: line-through">
              {todaysLunch.regular_price}
            </p>
            <button onClick={() => setSelectedItem(todaysLunch)}>
              {strings.cart?.addToOrder || '+ Lisää tilaukseen'}
            </button>
          </div>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div>
              <div>
                <h2 className="font-bold">
                  {strings.menu?.ingredients || 'Ainesosat'}
                </h2>
                <p>{todaysLunch.ingredients}</p>
                <p>
                  {strings.menu?.allergens || 'Allergeenit'}:{' '}
                  {allergens.join(', ')}{' '}
                </p>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default HighlightCard;
