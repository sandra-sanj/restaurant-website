import { createContext, useState, useContext, useEffect } from "react";
import { useOrder } from "../hooks/apiHook";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [delivery, setDelivery] = useState('delivery');
    const {postNewOrder} = useOrder();
    const [orderResult, setOrderResult] = useState([]);

    //tähän order state next ja setNext??
    

    const handleAddItem = (item) => {
        //creates new object so the original stays the same
        const quantity = Number(item.quantity);
        const unitPrice = Number(item.price || item.special_price);

        const cartItem = {
            unique_id: item.menu_item_id + Math.floor(Math.random() * 101), // unique id for map function in cart and removing item
            menu_item_id: item.menu_item_id,
            item_name: item.item_name ?? item.name,
            selected_protein: item.selected_protein,
            selected_spice_level: item.selected_spice_level ?? item.spice_level,
            quantity: quantity,
            unit_price: unitPrice,
            special_request: item.special_request ?? null,
        };
        setCart((prevOrder) => [...prevOrder, cartItem]);
    }

    const handleContactInfo = (info) => {
        const contactInfo = {
            user_id: info.user_id,
            //total_price: info.total_price,
            customer_name: info.username,
            customer_email: info.email,
            customer_phone: info.phone,
            delivery_address: info.address,
            order_type: info.order_type,
            items: cart
        };
        setOrder(contactInfo);
        
    }



    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0).toFixed(2);
    }

    const handleRemoveItem = async (unique_id) => {
        setCart((prevOrder) => {
            const removed = prevOrder.filter(i => i.unique_id !== unique_id);
            calculateTotal();
            return removed;
        });
    }

    const handleOrder = async () => {
        //console.log('tästä sitten tilaus apiin');
        const orderResponse = await postNewOrder({order});
        console.log(orderResponse);
        setCart([]);
        setOrder([]);
        if (orderResponse) { 
            setOrderResult(orderResponse.result);
            console.log(orderResponse.result);
        };
        
    }





    const value = { //values for context provider
        cart,
        calculateTotal,
        handleAddItem,
        handleRemoveItem,
        setCart,
        handleOrder,
        setDelivery,
        delivery,
        handleContactInfo,
        orderResult,
    }

    return ( 
    <OrderContext.Provider value={value}>
        {children}
    </OrderContext.Provider>
    );
};

export { OrderProvider, OrderContext};