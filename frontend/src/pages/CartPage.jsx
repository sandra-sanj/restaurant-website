import { useState } from 'react';
import Cart from '../components/shoppingcart/Cart';
import Order from '../components/shoppingcart/Order';
import Payment from '../components/shoppingcart/Payment';
import Confirmation from '../components/shoppingcart/Confirmation';
import { useUserContext } from '../hooks/contextHook';
import UserOrder from '../components/shoppingcart/UserOrder';
  


const CartPage = () => {
  const [next, setNext] = useState('cart');
  const [payment, setPayment] = useState('Mobilepay');

  const {user} = useUserContext();

    if (next === 'cart') return <Cart setNext={setNext}></Cart>;
    else if(next === 'order') return (
      user ? <UserOrder 
      setNext={setNext} 
      payment={payment} 
      setPayment={setPayment}></UserOrder>
       : <Order 
      setNext={setNext} 
      payment={payment} 
      setPayment={setPayment}></Order>
    )
      
    else if(next === 'payment') return <Payment setNext={setNext} payment={payment}></Payment>
    else if(next === 'confirmation') return <Confirmation></Confirmation>



}
export default CartPage;
