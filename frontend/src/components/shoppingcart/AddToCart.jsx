import {useEffect, useState} from 'react';
import {useOrderContext} from '../../hooks/contextHook';
import {useLanguage} from '../../hooks/useLanguage';
import Modal from '../Modal';

//lisää select protein

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const AddToCart = (props) => {
  useEffect(() => {});
  const {item, setSelectedItem} = props;
  const {language, strings} = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(1);
  const [price, setPrice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {handleAddItem} = useOrderContext();
  const [protein, setProtein] = useState('beef'); //default

  useEffect(() => {
    setQuantity(1);
    setSpiceLevel(null);
    setInputValue('');
    setShowModal(true);
  }, [item]);

  useEffect(() => {
    if (item && quantity > 0) {
      item.quantity = quantity;
      const newPrice =
        parseFloat(item.price) * quantity ||
        parseFloat(item.special_price) * quantity;
      setPrice(newPrice.toFixed(2));
      setSpiceLevel(spiceLevel);
      console.log(item);
    }
  }, [item, quantity]);

  useEffect(() => {
    if (item) {
      item.selected_spice_level = spiceLevel;
      item.selected_protein = protein;
    }
  }, [spiceLevel, protein]);

  const handleInput = (event) => {
    setInputValue(event.target.value);
    item.special_request = inputValue;
  };

  const handleAddToCart = () => {
    handleAddItem(item);
    console.log(`${item.name} added to cart`);
    console.log(`${item.special_request}`);
    setSelectedItem('');
  };

  if (!item) return null;

  // Get name and description in correct language
  const displayName = language === 'en' ? item.name_en : item.name;
  const displayDescription =
    language === 'en' ? item.description_en : item.description;

  return (
    <>
      {item && (
        <Modal isOpen={showModal} onClose={() => setSelectedItem('')}>
          <div className='flex flex-col'>
            <div>
              <img
                src={API_UPLOADS_URL + item.image_url}
                alt={displayDescription}
                width={'auto'}
                className="rounded-lg px-1"
              />
            </div>
            <div>
              <h1 className='text-3xl! font-semibold pt-2'>{displayName}</h1>
            </div>
            <div className='pt-3 p-1 flex flex-col gap-3'>
              <p>{displayDescription}</p>
              {item.allows_spice_custom === 1 && (
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  <button
                    className={spiceLevel === 1 ? 'bg-red-200!' : 'bg-slate-100! hover:bg-stone-200!'}
                    onClick={() => setSpiceLevel(1)}
                  >
                    {strings.cart?.mild || 'Mild'}
                  </button>
                  <button
                    className={spiceLevel === 2 ? 'bg-red-200!' : 'bg-slate-100! hover:bg-stone-200!'}
                    onClick={() => setSpiceLevel(2)}
                  >
                    {strings.cart?.medium || 'Medium'}
                  </button>
                  <button
                    className={spiceLevel === 3 ? 'bg-red-200!' : 'bg-slate-100! hover:bg-stone-200!'}
                    onClick={() => setSpiceLevel(3)}
                  >
                    {strings.cart?.spicy || 'Spicy'}
                  </button>
                </div>
              )}
              {item.available_proteins && (
                <div className="grid grid-cols-2 gap-0">
                  <button onClick={() => setProtein('chicken')}
                    className={protein === 'chicken' ? 'bg-blue-200!' : 'bg-slate-100! hover:bg-stone-200!'}>
                    {strings.cart?.chicken || 'Kana'} (L, G)
                  </button>
                  <button onClick={() => setProtein('beef')}
                    className={protein === 'beef' ? 'bg-blue-200!' : 'bg-slate-100! hover:bg-stone-200!'}>
                    {strings.cart?.beef || 'Nauta'} (L, G)
                  </button>
                  <button onClick={() => setProtein('vegan')}
                    className={protein === 'vegan' ? 'bg-blue-200!' : 'bg-slate-100! hover:bg-stone-200! '}>
                    {strings.cart?.plantProtein || 'Kasviproteiini'} (VE, L, G)
                  </button>
                  <button onClick={() => setProtein('shrimp')}
                    className={protein === 'shrimp' ? 'bg-blue-200!' : 'bg-slate-100! hover:bg-stone-200!'}>
                    {strings.cart?.shrimp || 'Katkarapu'} (L, G)
                  </button>
                </div>
              )}
              <div>
                <label className='flex flex-col gap-2 items-start mx-3'>
                  {strings.cart?.additionalInfo || 'Lisätiedot'}:
                  <textarea
                    onSubmit={(e) => handleInput(e)}
                    name="postContent"
                    rows={4}
                    cols={40}
                    placeholder={
                      strings.cart?.additionalInfoPlaceholder ||
                      'Kirjoita lisätietoa allergioista tai tilauksesta...'
                    }
                    className="bg-neutral-50 p-1 w-full h-20"
                    value={inputValue}
                    onChange={(e) => handleInput(e)}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap- mt-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3! py-1! border! border-stone-500! rounded-lg! bg-slate-100! hover:bg-stone-200!">
                -
              </button>
              <p id='quantityOfItems'>{quantity}</p>
              <button onClick={() => setQuantity((q) => q + 1)}
                className="px-2.5! py-1! border! border-stone-500! rounded-lg! bg-slate-100! hover:bg-stone-200!" id='quantity-plus-btn'>+</button>
              <button onClick={() => handleAddToCart()}
                className='bg-[#2A4B11]! text-white!' id='addToCartBtn'>
                {strings.cart?.addToCart || 'Lisää ostoskoriin'} {price} €
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddToCart;
