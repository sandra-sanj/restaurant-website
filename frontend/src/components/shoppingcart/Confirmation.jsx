import { useOrderContext } from "../../hooks/contextHook"

const Confirmation = () => {
  const {order} = useOrderContext();
  
    return(
        <>
          <h1>Tilaus onnistui! </h1>
          <p>Jos tilauksen kanssa on ongelmia, olethan yhteydessä ravintolaan (+358 7776669)</p>
          <div>
            <p>Order ID: </p>
            <p>OrderType</p>
            <p>Payment</p>

            <div>
              <h2>Tuotteet: </h2>
            </div>
          </div>
          <p>This is confirmation</p>
          <p>and here will be information of your order</p>
        </>
    )
}
export default Confirmation