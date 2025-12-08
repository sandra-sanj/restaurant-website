import { useState } from "react";
import { useOrderContext } from "../../hooks/contextHook";

const Payment = (props) => {
    const [msg, setMsg] = useState('');
    const {next, setNext} = props;
    const {handleOrder} = useOrderContext();

    const handleClick = () => {
        setMsg('maksua suoritetaan...')

        setTimeout(() => {
            console.log('5 sek kulunut');
            handleOrder();
            setNext('confirmation');
        }, 3000)
    }

    return (
    <>
        <dialog open>
            <form method="dialog">
                <p>Mobilepay</p>
                <p>Visa</p>
                <p>Nordea</p>
                <p>S-pankki</p>
                <button onClick={() => handleClick()}>ok</button>
            </form>
        </dialog>
        <p>{msg}</p>
    </>
    )
};
export default Payment;