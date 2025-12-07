import { useState } from "react";
import { useOrderContext } from "../../hooks/contextHook";
import OrderCard from "./OrderCard";


function Cart() {
  const { order, totalPrice } = useOrderContext();
  console.log(order);


  if (order.length < 1) return <p>Ostoskorisi on tyhjä</p>

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <h1>Ostoskori</h1>
        </div>
        <div>
          <h2>Toimitustapa</h2>
          <button>Toimitus</button>
          <button>Nouto</button>
        </div>
        <div>
          <h2>Tuotteet</h2>
            { order.map((item) => (
            <OrderCard 
              key={item.menu_item_id}
              item={item}
            />)) 
            }
        </div>
        <div>
          <p>Subtotal {Number(totalPrice).toFixed(2)} €</p>
          <p>Toimitusmaksu 4,90 €</p>
          <p>Yhteensä xx,xx €</p>
        </div>
        <div>
          <button>Kassalle</button>
        </div>
      </div>
    </>
  );
}
export default Cart;