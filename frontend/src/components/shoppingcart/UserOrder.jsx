import {useOrderContext, useUserContext} from '../../hooks/contextHook';
import OrderCard from './OrderCard';
import useForm from '../../hooks/formHooks';
import {useState, useEffect} from 'react';
import Modal from '../Modal';
import {useLanguage} from '../../hooks/useLanguage';

//swtich this to cart
//FoodCard but for items in shopping cart?

function UserOrder(props) {
  const { setNext, payment, setPayment } = props;
  const { cart, delivery, calculateTotal, handleContactInfo } = useOrderContext();
  const { user } = useUserContext();
  const { strings } = useLanguage();

  const initValues = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: '',
  };

  const placeOrder = () => {
    try {
      inputs.user_id = user.user_id;
      inputs.order_type = delivery;
      handleContactInfo(inputs);
      setNext('payment');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (method) => {
    setPayment(method);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(placeOrder, initValues);

  return (
    <div className="bg-[#fcebeb] flex flex-col sm:flex-row border border-stone-300 rounded-lg m-5 w-[300px] xs:w-[350px] sm:w-[600px]">
      <span
        className="cursor-pointer font-bold text-lg ml-2 mt-1 w-[12px]"
        onClick={() => setNext('cart')}
      >
        &times;
      </span>

      <div className="max-sm:mb-1 max-sm:mt-0 m-6 flex-1">
        <h2 className="text-xl mb-5 text-black font-semibold">
          {strings.cart?.contactInfo || 'Yhteystiedot'}
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-3 w-full"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="ordername" className="flex flex-col">
              {strings.cart?.username || 'Koko nimi'}:
            </label>
            <input
              name="username"
              type="text"
              id="ordername"
              value={user.username}
              onChange={handleInputChange}
              autoComplete="username"
              className="bg-stone-100 rounded w-full"
            />
          </div>

          <div className="w-full">
            <label htmlFor="orderemail" className="flex flex-col">
              {strings.auth?.email || 'Sähköposti'}:
            </label>
            <input
              name="email"
              type="email"
              id="orderemail"
              value={user.email}
              onChange={handleInputChange}
              autoComplete="email"
              className="bg-stone-100 rounded w-full"
            />
          </div>

          <div className="w-full">
            <label htmlFor="orderphone" className="flex flex-col gap-1">
              {strings.auth?.phone || 'Puhelinnumero'}:
            </label>
            <input
              name="phone"
              type="text"
              id="orderphone"
              value={user.phone}
              onChange={handleInputChange}
              autoComplete="phone"
              className="bg-stone-100 rounded w-full"
            />
          </div>

          {delivery === 'delivery' && (
            <div className="w-full">
              <label htmlFor="address" className="flex flex-col gap-0 sm:gap-1">
                {strings.cart?.address || 'Osoite'}:
              </label>
              <input
                name="address"
                type="text"
                id="address"
                onChange={handleInputChange}
                autoComplete="address"
                className="bg-stone-100 rounded w-full"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-[#2A4B11]! hover:bg-[#556d44] text-white! sm:px-4 sm:py-2 rounded w-1/2"
          >
            {strings.cart?.proceedToPayment || 'Siirry maksuun'}
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-2 max-sm:pb-3 p-5 sm:pt-8 bg-white border-t md:border-t-0 md:border-l max-sm:rounded-b-lg sm:rounded-r-lg sm:w-auto justify-end">
        <h2 className="font-semibold text-xl">
          {strings.cart?.paymentMethod || 'Maksutapa'}
        </h2>

        {['Mobilepay', 'Applepay', 'Visa', 'Mastercard'].map((method) => (
          <button
            key={method}
            className={`px-3 py-1 w-1/2 sm:w-full rounded border ${payment === method ? '!bg-[#2A4B11] text-white' : 'bg-white text-black border! border-gray-200!'}`}
            onClick={() => handlePayment(method)}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserOrder;
