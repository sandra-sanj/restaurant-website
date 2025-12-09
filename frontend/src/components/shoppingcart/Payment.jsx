import { useState } from "react";
import { useOrderContext } from "../../hooks/contextHook";

const Payment = (props) => {
    const [msg, setMsg] = useState('');
    const {setNext, payment} = props;
    const {handleOrder} = useOrderContext();

    const handleClick = () => {
        setMsg('maksua suoritetaan...')

        setTimeout(() => {
            handleOrder();
            setNext('confirmation');
        }, 3000)
    }

    return (
    <>
        <dialog open>
            <form method="dialog">
                <p>Valittu metodi: {payment}</p>
                <p>Suorita maksu</p>
                <button onClick={() => handleClick()}>ok</button>
            </form>
        </dialog>
        <p>{msg}</p>
    </>
    )
};
export default Payment;