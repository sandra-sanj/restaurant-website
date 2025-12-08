import { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleAddItem = (item) => {
        //creates new object so the original stays the same
        const unitPrice = Number(item.price);
        const quantity = Number(item.quantity);

        const cartItem = {
            uniqeue_id: item.menu_item_id + Random.Number,
            menu_item_id: item.menu_item_id,
            item_name: item.item_name ?? item.name,
            selected_protein: item.selected_protein,
            selected_spice_level: item.selected_spice_level,
            quantity: quantity,
            unit_price: unitPrice,
            special_request: item.special_request,
        };

        setOrder((prevOrder) => [...prevOrder, cartItem]);
    }


    const handleRemoveItem = (menu_item_id) => {
        setOrder((prevOrder) => {
            const removed = prevOrder.filter(i => i.menu_item_id !== menu_item_id);
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