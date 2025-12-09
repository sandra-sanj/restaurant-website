import { useState } from 'react';
import Cart from '../components/shoppingcart/Cart';
import Order from '../components/shoppingcart/Order';
import Payment from '../components/shoppingcart/Payment';
import Confirmation from '../components/shoppingcart/Confirmation';
  


const CartPage = () => {
  const [next, setNext] = useState('cart');
  const [payment, setPayment] = useState('')

    if (next === 'cart') return <Cart setNext={setNext}></Cart>;
    else if(next === 'order') return <Order setNext={setNext} payment={payment} setPayment={setPayment}></Order>;
    else if(next === 'payment') return <Payment setNext={setNext}></Payment>
    else if(next === 'confirmation') return <Confirmation></Confirmation>



}
export default CartPage;
