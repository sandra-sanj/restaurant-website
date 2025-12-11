import {useEffect, useState} from 'react';
import {useLanguage} from '../../hooks/useLanguage';
import Modal from '../Modal';
import {useAllergens} from '../../hooks/apiHook';

const FoodCard = (props) => {
  const {item, setSelectedItem} = props;
  const {language, strings} = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const {getMenuItemAllergens} = useAllergens();
  const [allergens, setAllergens] = useState([]);
  const [codes, setCodes] = useState([]);

  const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

  useEffect(() => {
    const handleAllergens = async () => {
      const response = await getMenuItemAllergens(item.menu_item_id);
      if(response) {
        const allergen = response.map(a => a.name);
        const code = response.map(c => c.code);
        setAllergens(allergen);
        setCodes(code);
      }
      //console.log(allergen, codes);
    };
    
      handleAllergens();
    
    
  }, [item])

  
  // Get name and description in correct language
  const displayName = language === 'en' ? item.name_en : item.name;
  const displayDescription =
    language === 'en' ? item.description_en : item.description;

  return (
    <>
      <div className="w-[350px] md:w-[500px] rounded-md outline-2 outline-stone-400 bg-white m-3 flex flex-col">
        <img
          src={API_UPLOADS_URL + item.image_thumb_url}
          alt={displayDescription}
          width={'auto'}
          className="rounded-t-md border-b border-stone-200"
        />
        <div className='flex flex-row items-center justify-center'>
          <h2 className='font-semibold'>{displayName}</h2>
          <button onClick={() => setShowModal(true)}
            className='bg-zinc-100! rounded-4xl! text-sm! font-bold border border-stone-500! hover:bg-zinc-200!'>i</button>
        </div>

        <p className='p-3'>{displayDescription}</p>
        {codes.join(', ')}

        <p className='font-semibold mt-3'>{item.price} €</p>
        <button onClick={() => setSelectedItem(item)}
          className='bg-[#2A4B11]! text-white!' id='button-for-opening-modal'>
          {strings.cart.addToCart}
        </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <div>
            <h2 className="font-bold">{strings.menu.ingredients}</h2>
            <p>{item.ingredients}</p>
            <p>
              {strings.menu.allergens}: {allergens.join(', ')} 
              <br></br>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

//<Link to='/addtocard'A></Link>
export default FoodCard;
