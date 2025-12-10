import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook';
import AddToCart from '../shoppingcart/AddToCart';
import Modal from "../Modal";
import {useAllergen} from '../../hooks/apiHook';

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const HighlightCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {getAllergen} = useAllergen();
  const [allergens, setAllergens] = useState([]);
  const [codes, setCodes] = useState([]);

  const {todaysLunch, error} = useMenu();
  //console.log(todaysLunch);


  useEffect(() => {
    const handleAllergens = async () => {
      const response = await getAllergen(todaysLunch.menu_item_id);
      console.log('res: ', response)
      const allergen = response.map(a => a.name);
      const code = response.map(c => c.code);
      setAllergens(allergen);
      setCodes(code);
      console.log(allergen, codes);
    };
    
      handleAllergens();
    
    
  }, [todaysLunch])
  


  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {todaysLunch && (
        <div>
          <AddToCart item={selectedItem} setSelectedItem={setSelectedItem} />
          <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-10 outline-red-800">
            <img
              src={API_UPLOADS_URL + todaysLunch.image_thumb_url}
              alt={todaysLunch.description}
              width={'auto'}
              className="rounded-md"
            />
            <div>
              <h2>{todaysLunch.name}</h2>
              <p>Päivän lounas</p>
              <button onClick={() => setShowModal(true)}>i</button>
            </div>

            <p>{todaysLunch.description}</p>
            <p>{todaysLunch.special_price}</p>
            <p className="text-decoration-line: line-through">
              {todaysLunch.regular_price}
            </p>
            <button onClick={() => setSelectedItem(todaysLunch)}>
              + Lisää tilaukseen
            </button>
          </div>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div>
          <div>
            <h2 className="font-bold">Ainesosat</h2>
            <p>{todaysLunch.ingredients}</p>
            <p>allergeenit: {allergens.join(', ')}  </p>
          </div>
        </div>
        </Modal>
        </div>
      )}
    </>
  );
};

export default HighlightCard;
