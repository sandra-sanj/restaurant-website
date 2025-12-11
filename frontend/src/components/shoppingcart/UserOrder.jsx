import {useOrderContext, useUserContext} from '../../hooks/contextHook';
import OrderCard from './OrderCard';
import useForm from '../../hooks/formHooks';
import {useState, useEffect} from 'react';
import Modal from '../Modal';
import {useLanguage} from '../../hooks/useLanguage';

//swtich this to cart
//FoodCard but for items in shopping cart?

function UserOrder(props) {
  const {setNext, payment, setPayment} = props;
  const {cart, delivery, calculateTotal, handleContactInfo} = useOrderContext();
  const {user} = useUserContext();
  const {strings} = useLanguage();

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
      console.log('con: ', inputs);
      handleContactInfo(inputs);
      setNext('payment'); //opens payment component
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (method) => {
    setPayment(method);
  };

  //console.log(initValues);
  const {inputs, handleInputChange, handleSubmit} = useForm(
    placeOrder,
    initValues,
  );
  //bg-white w-[400px]
  return (
    <div className="bg-[#fcebeb] flex flex-row border border-stone-300 rounded-lg m-5">
      <span
        className="cursor-pointer font-bold text-lg ml-2 mt-1 w-[12px]"
        onClick={() => setNext('cart')}
      >
        {' '}
        {/*goes back to cart*/}
        &times;
      </span>
      <div className="m-8">
        <h2 className="text-xl mb-5 text-black font-semibold">
          {strings.cart?.contactInfo || 'Yhteystiedot'}
        </h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor="ordername" className="flex flex-col">
              {strings.cart?.username || 'Koko nimi'}:{' '}
            </label>
            <input
              name="username"
              type="text"
              id="ordername"
              value={user.username}
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="username"
              className="bg-stone-100 rounded"
            />
          </div>
          <div>
            <label htmlFor="orderemail" className="flex flex-col">
              {strings.auth?.email || 'Sähköposti'}:{' '}
            </label>
            <input
              name="email"
              type="email"
              id="orderemail"
              value={user.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="email"
              className="bg-stone-100 rounded"
            />
          </div>
          <div>
            <label htmlFor="orderphone" className="flex flex-col gap-1">
              {strings.auth?.phone || 'Puhelinnumero'}:{' '}
            </label>
            <input
              name="phone"
              type="text"
              id="orderphone"
              value={user.phone}
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="phone"
              className="bg-stone-100 rounded"
            />
          </div>
          {delivery === 'delivery' && (
            <div>
              <label htmlFor="address" className="flex flex-col gap-1">
                {strings.cart?.address || 'Osoite'}:{' '}
              </label>
              <input
                name="address"
                type="text"
                id="address"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                autoComplete="address"
                className="bg-stone-100 rounded"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-[#2A4B11]! hover:bg-[#556d44]! text-white"
          >
            {strings.cart?.proceedToPayment || 'Siirry maksuun'}
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-5 pt-8 bg-white border-l rounded-r-lg">
        <h2 className="font-semibold text-xl">
          {strings.cart?.paymentMethod || 'Maksutapa'}
        </h2>
        <button
          className={`px-3 py-1 rounded border ${payment === 'Mobilepay' ? '!bg-[#2A4B11] text-white' : 'bg-white text-black'}`}
          onClick={() => handlePayment('Mobilepay')}
        >
          Mobilepay
        </button>

        <button
          className={`px-3 py-1 rounded border ${payment === 'Applepay' ? '!bg-[#2A4B11] text-white' : 'bg-white text-black'}`}
          onClick={() => handlePayment('Applepay')}
        >
          Applepay
        </button>

        <button
          className={`px-3 py-1 rounded border ${payment === 'Visa' ? '!bg-[#2A4B11] text-white' : 'bg-white text-black'}`}
          onClick={() => handlePayment('Visa')}
        >
          Visa
        </button>

        <button
          className={`px-3 py-1 rounded border ${payment === 'Mastercard' ? '!bg-[#2A4B11] text-white' : 'bg-white text-black'}`}
          onClick={() => handlePayment('Mastercard')}
        >
          Mastercard
        </button>
      </div>
    </div>
  );
}

export default UserOrder;
