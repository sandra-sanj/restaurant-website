import {useEffect, useState} from 'react';
import {useOrderContext} from '../../hooks/contextHook';

//this is a card for menu item in shopping cart

const OrderCard = (props) => {
  const {handleRemoveItem, calculateTotal} = useOrderContext();
  const {item, setTotalPrice} = props;
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    item.quantity = quantity;
    setTotalPrice(calculateTotal());
    if (quantity == 0) {
      handleRemoveItem(item.unique_id);
      setTotalPrice(calculateTotal());
    }
  }, [quantity]);

  return (
    <div className="mb-2 flex flex-row gap-5">
      <div className='flex flex-col min-w-[200px] text-left justify-center'>
        <p className="pl-5">{item.item_name}</p>
        <p className='pl-5'>{(quantity * item.unit_price).toFixed(2)} €</p>
      </div>

      <div className="flex flex-row w-full gap-2 items-center justify-end">
        <button
          onClick={() => setQuantity(0)}
          className="rounded-3xl! bg-[#982A2A]! hover:bg-[#982A2a80]! border! border-stone-500! py-1.5! px-3.5! text-white"
        >
          x
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setQuantity((q) => Math.max(0, q - 1))}
            className="px-3! py-1! border! border-stone-500! rounded-lg! hover:bg-stone-200!"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-2.5! py-1! border! border-stone-500! rounded-lg! hover:bg-stone-200!"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
