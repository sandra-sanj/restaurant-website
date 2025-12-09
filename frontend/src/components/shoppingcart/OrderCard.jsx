import { useEffect, useState} from "react";
import { useOrderContext } from "../../hooks/contextHook";

//this is a card for menu item in shopping cart

const OrderCard = (props) => {
    const {handleRemoveItem, calculateTotal} = useOrderContext();
    const {item, setTotalPrice} = props;
    const [quantity, setQuantity] = useState(item.quantity);
    

  useEffect(() => {
    item.quantity = quantity;
    setTotalPrice(calculateTotal());
    if(quantity == 0) {
      handleRemoveItem(item.unique_id);
      setTotalPrice(calculateTotal());
    }
  }, [quantity]);


    return (
        <div>
          <p>{item.item_name}</p>
          <p>{(quantity * item.unit_price).toFixed(2)} €</p>


          <div className="flex gap-2 items-center">
              <button onClick={() => setQuantity(0)} className="border rounded bg-[#982A2A]! text-white">x</button>


              <div className="flex items-center gap-1">
                <button onClick={() => setQuantity(q => Math.max(0, q - 1))} className="px-2 py-1 border rounded">-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-2 py-1 border rounded">+</button>
              </div>
            </div> 
        </div>
    )
    
};
export default OrderCard;