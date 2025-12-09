import {useEffect, useState} from "react";
import { useOrderContext } from "../../hooks/contextHook";
import OrderCard from "./OrderCard";



function Cart(props) {
  const {setNext} = props;
  
  const [selectedDelivery, setSelectedDelivery] = useState("delivery");
   const { cart, calculateTotal, setDelivery } = useOrderContext();
  const [totalPrice, setTotalPrice] = useState(calculateTotal());

  


  const handleDeliveryClick = (method) => {
     setSelectedDelivery(method);
     setDelivery(method);
  }

 

  
  console.log(cart);

  const totalWithDelivery = Number(totalPrice) + Number(4.9);



  if (cart.length < 1) return <p>Ostoskorisi on tyhjä</p>



  return (
  <>
    <div className="m-5 outline-2 outline-gray-400 rounded-md w-[400px]">
      {/* Header */}
      <div className="flex justify-center p-4 rounded-t-md">
        <h1 className="text-lg">Ostoskori</h1>
      </div>
      {/* Delivery method*/}
      <div className="flex flex-col gap-2 p-4 bg-white">
        <h2 className="font-semibold">Toimitustapa</h2>
        <div className="flex flex-row justify-center gap-2">
          
          <button className={`px-3 py-1 rounded border ${selectedDelivery === "delivery" ? "bg-[#2A4B11]! text-white" : "bg-white text-black"}`} onClick={() => handleDeliveryClick("delivery")}>Toimitus</button>

          <button className={`px-3 py-1 rounded border ${selectedDelivery === "pickup" ? "bg-[#2A4B11]! text-white" : "bg-white text-black"}`} onClick={() => handleDeliveryClick("pickup")}>Nouto</button>
        </div>
      </div>
    

      {/* Products */}
      <div className="flex flex-col gap-2 p-4 bg-white mt-2">
        <h2 className="font-semibold">Tuotteet</h2>
        { cart.map((item) => (
            <OrderCard 
              key={item.unique_id}
              item={item}
              setTotalPrice={setTotalPrice}
              className="flex justify-between items-center border-b py-2"
            />)) 
            }
            <div className="flex gap-2 items-center">
              <div>
                <p className="font-medium"></p>
                <p>{} </p>
              </div>
            </div>
          </div>
        
      </div>
      

      {/* Summary */}
      <div className="flex flex-col gap-1 p-4 bg-white mt-2">
          {selectedDelivery === 'delivery' ? (
            <>
              <p>Subtotal {Number(totalPrice).toFixed(2)} €</p>
              <p>Toimitusmaksu 4,90 €</p>
              <p className="font-semibold">Yhteensä: {totalWithDelivery.toFixed(2)} €</p>
            </>

          ) : (
            <p className="font-semibold">Yhteensä: {totalPrice} €</p>
          )}
          
      </div>

      {/* Checkout button */}
      <div className="p-4 bg-white mt-2 flex">
        <button onClick={() => setNext('order')} className="w-full py-2 rounded border bg-[#2A4B11]! text-white">Kassalle</button>
      </div>
 
</>

);
}

export default Cart;
