import {useOrderContext, useUserContext} from '../../hooks/contextHook';
import OrderCard from './OrderCard';
import useForm from '../../hooks/formHooks';
import {useState, useEffect} from 'react';
import Modal from '../Modal';

//swtich this to cart
//FoodCard but for items in shopping cart?

function Order(props) {
  const {setNext, payment, setPayment} = props;
  const {cart, delivery, calculateTotal, handleContactInfo} = useOrderContext();
  const {user} = useUserContext();
  const [initValues, setInitValues] = useState([]);

  const initValues1 = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: '',
  };

  const initValues2 = {
    username: '',
    email: '',
    phone: '',
    address: '',
  };

  useEffect(() => {
    setInitValues(user ? initValues1 : initValues2);
  }, [user]);

  const total = calculateTotal();

  const placeOrder = () => {
    try {
      //inputs.total_price = total;
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
      <div className="m-8">
        <h2 className="text-xl mb-5 text-black font-semibold">Yhteystiedot</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor="ordername" className="flex flex-col">
              Koko nimi:{' '}
            </label>
            <input
              name="username"
              type="text"
              id="ordername"
              onChange={(e) => {
                handleInputChange(e);
              }}
              autoComplete="username"
              className="bg-stone-100 rounded"
            />
          </div>
          <div>
            <label htmlFor="orderemail" className="flex flex-col">
              Sähköposti:{' '}
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
            />
          </div>
          <div>
            <label htmlFor="orderphone" className="flex flex-col gap-1">
              Puhelinnumero:{' '}
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
            />
          </div>
          <div>
            <label htmlFor="address" className="flex flex-col gap-1">
              Osoite:{' '}
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
            />
          </div>
          <button type="submit"
          className='bg-[#2A4B11]! hover:bg-[#556d44]! text-white'>Siirry maksuun</button>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-5 pt-8 bg-white border-l rounded-r-lg">
        <h2 className="font-semibold text-xl">Maksutapa</h2>
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
