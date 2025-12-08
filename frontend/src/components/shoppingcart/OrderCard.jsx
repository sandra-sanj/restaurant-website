import { useEffect } from "react";
import { useOrderContext } from "../../hooks/contextHook";

//this is a card for menu item in shopping cart

const OrderCard = (props) => {
    const {handleRemoveItem} = useOrderContext();
    const {item} = props;

    return (
        <div>
          <p>{item.item_name}</p>
          <p>{item.unit_price.toFixed(2)} €</p>
          <button onClick={() => handleRemoveItem(item.unique_id)}>x</button>
          <button>- {item.quantity} +</button>
        </div>
    )
    
};
export default OrderCard;