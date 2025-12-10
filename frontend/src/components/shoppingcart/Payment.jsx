import { useState, useEffect } from "react";
import { useOrderContext } from "../../hooks/contextHook";
import Modal from "../Modal";

const Payment = (props) => {
    const [msg, setMsg] = useState('');
    const {setNext, payment} = props;
    const {handleOrder} = useOrderContext();
    const [showModal, setShowModal] = useState(false);
    
      useEffect(() => {
        setShowModal(true);
      }, [])

    const handleClick = () => {
        setShowModal(false)
        setMsg('maksua suoritetaan...')

        setTimeout(() => {
            handleOrder();
            setNext('confirmation');
        }, 2000)
    }

    return (
    <>
        <Modal isOpen={showModal} onClose={() => confirm('Haluatko varmasti keskeyttää tilauksen?') && setNext('cart')
        }>
        
            <p>Valittu metodi: {payment}</p>
            <p className="mt-5 font-semibold ">Suorita maksu</p>
            <button onClick={() => handleClick()}
                className=" bg-[#2A4B11]! text-white">OK</button>
        </Modal>
        <p>{msg}</p>
    </>
    )
};
export default Payment;