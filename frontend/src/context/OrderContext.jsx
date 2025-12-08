import { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    

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
            unit_price: unitPrice * quantity,
            special_request: item.special_request ?? null,
        };
        setCart((prevOrder) => [...prevOrder, cartItem]);
    }


    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.unit_price, 0).toFixed(2);
    }

    const handleRemoveItem = (unique_id) => {
        setCart((prevOrder) => {
            const removed = prevOrder.filter(i => i.unique_id !== unique_id);
            return removed;
        });
        // price of one item is price / quantity
    }

    const value = {
        cart,
        calculateTotal,
        handleAddItem,
        handleRemoveItem,
        setCart
    }




    return ( 
    <OrderContext.Provider value={value}>
        {children}
    </OrderContext.Provider>
    );
};

export { OrderProvider, OrderContext};