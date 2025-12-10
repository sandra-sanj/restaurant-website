import { useOrderContext } from "../../hooks/contextHook"
import OrderedItem from "./OrderedItem";

const Confirmation = () => {
  const {orderResult} = useOrderContext();
  console.log(orderResult);
    return(
    <>
      {orderResult && (
        <div>
          <h1>Kiitos tilauksesta! </h1>
          <p>Jos tilauksen kanssa on ongelmia, olethan yhteydessä ravintolaan (+358 7776669)</p>
          <div>
            <p>Order ID:{orderResult.order_id}</p>
            <p>{orderResult.order_type}</p>
            <p>Payment</p>

            <div>
              <h2>Tuotteet: </h2>
              {orderResult.items.map((item) => (
                <OrderedItem
                  key={item.order_item_id}
                  item={item}
                  className="flex justify-between items-center border-b py-2"
            />
          ))}
            <p>{orderResult.total_price} €</p>
            </div>
          </div>

        </div>

      )}
          
    </>
    )
}
export default Confirmation