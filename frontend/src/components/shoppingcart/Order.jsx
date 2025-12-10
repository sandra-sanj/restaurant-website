import {useOrderContext, useUserContext} from '../../hooks/contextHook';
import OrderCard from './OrderCard';
import useForm from '../../hooks/formHooks';
import {useState, useEffect} from 'react';
import Modal from '../Modal';
import {useLanguage} from '../../hooks/useLanguage';

//swtich this to cart
//FoodCard but for items in shopping cart?

function Order(props) {
  const {setNext, payment, setPayment} = props;
  const {cart, delivery, calculateTotal, handleContactInfo} = useOrderContext();
  const {user} = useUserContext();
  const {strings} = useLanguage();

  const initValues2 = {
    username: '',
    email: '',
    phone: '',
    address: '',
  };

  const placeOrder = () => {
    try {
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
    initValues2,
  );
  //bg-white w-[400px]
  return (
    <div className="bg-[#fcebeb] flex flex-row border border-stone-300 rounded-lg m-5">
      <span
        className="cursor-pointer font-bold text-lg"
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
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="username"
              autoFocus
              className="bg-stone-100 rounded"
              required
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
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="email"
              className="bg-stone-100 rounded"
              required
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
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="phone"
              className="bg-stone-100 rounded"
              required
            />
          </div>
          {delivery === 'delivery' && (
            <div>
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

export default Order;
