import { useOrderContext } from "../../hooks/contextHook";
import FoodCard from "../menu/FoodCard";

//swtich this to cart
//FoodCard but for items in shopping cart?

function Order() {
    const { order } = useOrderContext();


    return (
        <> 
          <h1>Ostoskori</h1>
          <h2>Tuotteet</h2>
           {order ? order.map((item) => (
            <FoodCard 
              key={item.id}
              item={item}
            />
                
            )) : (
                <p>Ei tilauksia tällä hetkellä</p>
            )
            }
        </>
    )
} 

export default Order;