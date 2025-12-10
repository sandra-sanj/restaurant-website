
const OrderedItem = (props) => {
    const {item} = props;

    return (
    <>
        {item &&(
            <div>
                <p>{item.item_name}</p>
                <p>{item.unit_price} €</p>
                <p>{(item.quantity)} kpl</p>
            </div>
        )}
        <p>{item.name}</p>
    
    </> 

)};
export default OrderedItem;