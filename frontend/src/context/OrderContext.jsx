import { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext(null);

const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);

    const handleAddItem = (item) => {
        setOrder((prevOrder) => [...prevOrder, {id: item.menu_item_id, fire: item.fire, comment: item.comment, price: item.price}]); //arvot saattaa joutua fiksaamaan
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