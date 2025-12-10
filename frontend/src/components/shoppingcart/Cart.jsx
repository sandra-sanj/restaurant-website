import {useEffect, useState} from 'react';
import {useOrderContext} from '../../hooks/contextHook';
import {useLanguage} from '../../hooks/useLanguage';
import OrderCard from './OrderCard';

function Cart(props) {
  const {setNext} = props;
  const {cart, calculateTotal, setDelivery, delivery} = useOrderContext();
  const {strings} = useLanguage();
  const [selectedDelivery, setSelectedDelivery] = useState(delivery);

  const [totalPrice, setTotalPrice] = useState(calculateTotal());

  const handleDeliveryClick = (method) => {
    setSelectedDelivery(method);
    setDelivery(method);
  };

  console.log(cart);

  const totalWithDelivery = Number(totalPrice) + Number(4.9);

  if (cart.length < 1)
    return <p className='text-lg'>{strings.cart?.emptyCart || 'Ostoskorisi on tyhjä'}</p>;

  return (
    <>
      <div className="m-7 outline-2 outline-stone-500 rounded-md w-[350px] sm:w-[500px]">
        {/* Header */}
        <div className="flex justify-center p-4 bg-[#FFFFFF]">
          <h1 className="text-lg">{strings.cart?.title || 'Ostoskori'}</h1>
        </div>
        {/* Delivery method*/}
        <div className="flex flex-col gap-2 p-4 bg-red-50 border-t border-stone-100">
          <h2 className="font-semibold text-lg">
            {strings.cart?.deliveryMethod || 'Toimitustapa'}
          </h2>
          <div className="flex flex-row justify-center gap-2">
            <button
              className={`px-3 py-1 rounded border ${selectedDelivery === 'delivery' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black'}`}
              onClick={() => handleDeliveryClick('delivery')}
            >
              {strings.cart?.delivery || 'Toimitus'}
            </button>

            <button
              className={`px-3 py-1 rounded border ${selectedDelivery === 'pickup' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black'}`}
              onClick={() => handleDeliveryClick('pickup')}
            >
              {strings.cart?.pickup || 'Nouto'}
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-2 p-4 bg-red-50 border-t border-stone-400">
          <h2 className="font-semibold text-lg">
            {strings.cart?.products || 'Tuotteet'}
          </h2>
          {cart.map((item) => (
            <OrderCard
              key={item.unique_id}
              item={item}
              setTotalPrice={setTotalPrice}
              className="flex justify-between items-center border-b py-2 w-full"
            />
          ))}
          <div className="flex gap-2 items-center">
            <div>
              <p className="font-medium"></p>
              <p>{} </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1 p-4 bg-red-50 border-t border-stone-400">
          {selectedDelivery === 'delivery' ? (
            <>
              <p>
                {strings.cart?.subtotal || 'Välisumma'}{' '}
                {Number(totalPrice).toFixed(2)} €
              </p>
              <p>{strings.cart?.deliveryFee || 'Toimitusmaksu'} 4,90 €</p>
              <p className="font-semibold">
                {strings.cart?.total || 'Yhteensä'}:{' '}
                {totalWithDelivery.toFixed(2)} €
              </p>
            </>
          ) : (
            <p className="font-semibold">
              {strings.cart?.total || 'Yhteensä'}: {totalPrice} €
            </p>
          )}
        </div>

        {/* Checkout button */}
        <div className="p-5 bg-white flex border-t border-stone-100">
          <button
            onClick={() => setNext('order')}
            className="w-full py-2 rounded border bg-[#2A4B11]! text-white"
          >
            {strings.cart?.checkout || 'Kassalle'}
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
