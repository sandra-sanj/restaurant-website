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
        }, 3000)
    }

    return (
    <>
        <Modal isOpen={showModal} onClose={() => confirm('haluatko varmasti keskeyttää tilauksen?')}>
        
            <p>Valittu metodi: {payment}</p>
            <p>Suorita maksu</p>
            <button onClick={() => handleClick()}>ok</button>
        </Modal>
        <p>{msg}</p>
    </>
    )
};
export default Payment;