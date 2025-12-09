import { useOrderContext, useUserContext } from "../../hooks/contextHook";
import OrderCard from "./OrderCard";
import useForm from "../../hooks/formHooks";
import { useState, useEffect } from "react";
import Modal from "../Modal";

//swtich this to cart
//FoodCard but for items in shopping cart?

function Order(props) {
    const {setNext, payment, setPayment} = props;
    const { cart, delivery, calculateTotal, handleContactInfo } = useOrderContext();
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
        } catch(error) {
            console.log(error);
        }
    }

    const handlePayment = (method) => {
        setPayment(method);
    }

    

    //console.log(initValues);
    const {inputs, handleInputChange, handleSubmit} = useForm(placeOrder, initValues);


    

    return (
    <>
     <div className="flex flex-col gap-2 p-4 bg-white">
        <h2 className="font-semibold">Maksutapa</h2>
          <button className={`px-3 py-1 rounded border ${payment === "Mobilepay" ? "!bg-[#2A4B11] text-white" : "bg-white text-black"}`} onClick={() => handlePayment("Mobilepay")}>Mobilepay</button>

          <button className={`px-3 py-1 rounded border ${payment === "Applepay" ? "!bg-[#2A4B11] text-white" : "bg-white text-black"}`} onClick={() => handlePayment("Applepay")}>Applepay</button>
        

          <button className={`px-3 py-1 rounded border ${payment === "Visa" ? "!bg-[#2A4B11] text-white" : "bg-white text-black"}`} onClick={() => handlePayment("Visa")}>Visa</button>

          <button className={`px-3 py-1 rounded border ${payment === "Mastercard" ? "!bg-[#2A4B11] text-white" : "bg-white text-black"}`} onClick={() => handlePayment("Mastercard")}>Mastercard</button>
          
      </div>
        <h2>Yhteystiedot: </h2>
        <form onSubmit={ (e) => {handleSubmit(e)} }>
            <div>
                <label htmlFor="ordername">Koko nimi: </label>
                <input
                    name="username"
                    type="text"
                    id="ordername"
                    onChange={ (e) => {handleInputChange(e)} }
                    autoComplete="username"
                />
            </div>
            <div>
                <label htmlFor="orderemail">Sähköposti: </label>
                <input
                    name="email"
                    type="email"
                    id="orderemail"
                    onChange={ (e) => {handleInputChange(e)} }
                    autoComplete="email"
                />
            </div>
            <div>
                <label htmlFor="orderphone">Puhelinnumero: </label>
                <input
                    name="phone"
                    type="text"
                    id="orderphone"
                    onChange={ (e) => {handleInputChange(e)} }
                    autoComplete="phone"
                />
            </div>
            <div>
                <label htmlFor="address">Osoite: </label>
                <input
                    name="address"
                    type="text"
                    id="address"
                    onChange={ (e) => {handleInputChange(e)} }
                    autoComplete="address"
                />
            </div>
            <button type="submit">Siirry maksuun</button>
        </form>
            
        
    </>
    )
} 

export default Order;