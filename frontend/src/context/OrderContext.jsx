import { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);

    const handleAddItem = (item) => {
        setOrder((prevOrder) => [...prevOrder, {menu_item_id: item.menu_item_id, item_name: item.name, selected_protein: item.selected_protein, selected_spice_level: item.selected_spice_level, quantity: item.quantity, unit_price: item.price, special_request: item.special_request, }]); //arvot saattaa joutua fiksaamaan
    }

    const handleRemoveItem = (menu_item_id) => {
        setOrder((prevOrder) => prevOrder.filter(item => item.id !== menu_item_id ))
    }

    const value = {
        order,
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