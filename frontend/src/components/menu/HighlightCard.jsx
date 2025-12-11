import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook';
import AddToCart from '../shoppingcart/AddToCart';
import Modal from '../Modal';
import {useAllergens} from '../../hooks/apiHook';
import {useLanguage} from '../../hooks/useLanguage';

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const HighlightCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {getMenuItemAllergens} = useAllergens();
  const [allergens, setAllergens] = useState([]);
  const [codes, setCodes] = useState([]);

  const {todaysLunch, error} = useMenu();
  //console.log(todaysLunch);
  const {language, strings} = useLanguage();

  useEffect(() => {
    if (!todaysLunch) return;

    const handleAllergens = async () => {
      const response = await getMenuItemAllergens(todaysLunch.menu_item_id);
      //console.log('res: ', response);
      const allergen = response.map((a) => a.name);
      const code = response.map((c) => c.code);
      setAllergens(allergen);
      setCodes(code);
      //console.log(allergen, codes);
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
          <div> {/* className="relative w-[500px] mb-5"  TODO: lisää diviin tai poista*/}
            <div className="bg-white-50 w-[350px] md:w-[500px] rounded-md outline-10 outline-red-800 bg-white m-3 flex flex-col"> {/* TODO: lisää muotoilut diviin tai poista relative z-20 outline-2*/}
              <img
                src={API_UPLOADS_URL + todaysLunch.image_thumb_url}
                alt={displayDescription}
                width={'auto'}
                className="rounded-t-md border-b border-stone-200"
              />
              <div className="flex flex-row items-center justify-center gap-5 p-3">
                <h2 className="font-semibold text-lg">{displayName}</h2>
                <p className="text-lg">
                  {strings.menu?.lunchSpecial || 'Päivän lounas'}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-zinc-100! rounded-4xl! text-sm! font-bold border border-stone-500! hover:bg-zinc-200!"
                >
                  i
                </button>
              </div>
              <p className='p-3'>{displayDescription}</p>
              <p className='font-semibold pb-3'>{todaysLunch.special_price} €</p>
              <p className="text-decoration-line: line-through">
                {todaysLunch.regular_price} €
              </p>
              <button onClick={() => setSelectedItem(todaysLunch)}
                className='bg-[#2A4B11]! text-white!'>
                {strings.cart?.addToOrder || '+ Lisää tilaukseen'}
              </button>
            </div>

            {/*<div className="absolute -inset-1 rounded-md blur-md z-10 bg-red-800 opacity-40"></div>*/}
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
