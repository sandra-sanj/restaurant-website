import { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleAddItem = (item) => {
        //creates new object so the original stays the same
        const unitPrice = Number(item.price ?? item.special_price);
        const quantity = Number(item.quantity);

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

        setOrder((prevOrder) => [...prevOrder, cartItem]);
    }


    const handleRemoveItem = (unique_id) => {
        setOrder((prevOrder) => {
            const removed = prevOrder.filter(i => i.unique_id !== unique_id);
            return removed;
        });
    }

    const value = {
        order,
        totalPrice,
        handleAddItem,
        handleRemoveItem
    }




    return ( 
    <OrderContext.Provider value={value}>
        {children}
    </OrderContext.Provider>
    );
};

export { OrderProvider, OrderContext};