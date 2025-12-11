import {useState, useEffect} from 'react';
import {useOrderContext} from '../../hooks/contextHook';
import {useLanguage} from '../../hooks/useLanguage';

import Modal from '../Modal';

const Payment = (props) => {
  const [msg, setMsg] = useState('');
  const {setNext, payment} = props;
  const {handleOrder} = useOrderContext();
  const {strings} = useLanguage();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClick = () => {
    setShowModal(false);
    handleOrder();
    setMsg(strings.cart?.processingPayment || 'maksua suoritetaan...');

    setTimeout(() => {
      setNext('confirmation');
    }, 2000);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() =>
          confirm(
            strings.cart?.cancelOrderConfirm ||
              'Haluatko varmasti keskeyttää tilauksen?',
          ) && setNext('cart')
        }
      >
        <p>
          {strings.cart?.selectedMethod || 'Valittu metodi'}: {payment}
        </p>
        <p className="mt-5 font-semibold">
          {strings.cart?.executePayment || 'Suorita maksu'}
        </p>
        
        <button
          onClick={() => handleClick()}
          className=" bg-[#2A4B11]! text-white"
        >
          OK
        </button>
      </Modal>
      <p>{msg}</p>
    </>
  );
};
export default Payment;
