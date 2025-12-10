import { useOrderContext } from "../../hooks/contextHook"
import OrderedItem from "./OrderedItem";

const Confirmation = () => {
  const {orderResult} = useOrderContext();
  console.log(orderResult);
    return(
    <>
      {orderResult && (
        <div className="m-7 outline-2 outline-stone-500 rounded-md w-[500px]">
          <div>
            <h1 className="text-lg">Kiitos tilauksesta! </h1>
            <p>Jos tilauksen kanssa on ongelmia, olethan yhteydessä ravintolaan (+358 7776669)</p>
            <div>
              <p>Order ID:{orderResult.order_id}</p>
            <p>{orderResult.order_type}</p>
            <p>Payment</p>
            </div>

          </div>
        
          <div>
            <p>Order ID:{orderResult.order_id}</p>
            <p>{orderResult.order_type}</p>
            <p>Payment</p>

            <div>
              <h2 className="font-semibold text-lg">Tuotteet: </h2>
              {orderResult.items.map((item) => (
              <OrderedItem
                  key={item.order_item_id}
                  item={item}
                  className="flex justify-between items-center border-b py-2"
            />
          ))}
            <p></p>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-red-50 border-t border-stone-400">
          {/*selectedDelivery === 'delivery' ?*/ (
              <p>{orderResult.total_price} €</p>
              
              
          )  (
            <p className="font-semibold">Yhteensä:  €</p>
          )}
        </div>
          </div>

        </div>

      )}
          
    </>
    )
}
export default Confirmation