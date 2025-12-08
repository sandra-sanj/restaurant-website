import { useEffect, useState } from "react";
import { useOrderContext } from "../../hooks/contextHook";
import Modal from '../Modal';



const AddToCart = (props) => {
    useEffect(() => {

    })
    const {item, setSelectedItem} = props;
    const [quantity, setQuantity] = useState(1);
    const [spiceLevel, setSpiceLevel] = useState(null);
    const [price, setPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);



    const {handleAddItem} = useOrderContext();

    useEffect(() => {
        setQuantity(1);
        setSpiceLevel(null);
        setShowModal(true);
    }, [item]);

    useEffect(() => {
        if (item && quantity > 0) {
            item.quantity = quantity;
            const newPrice = (item.price ?? item.special_price * quantity);
            setPrice(newPrice.toFixed(2));
        }
    }, [item, quantity]);

    useEffect(() => {
    if (item) {
      item.selected_spice_level = spiceLevel;
    }
    }, [item, spiceLevel]);

    const handleAddToCart = () => {
        item.price = price;
        handleAddItem(item);
        console.log(`${item.name} added to cart`);
        setSelectedItem('');
    }

    


    if (!item) return null;

    return (
        <>
            {item && (
                <Modal isOpen={showModal} onClose={() => setSelectedItem('')}>
                <div className="m-5 outline-2 outline-gray-400 rounded-md w-[500px]">
                    <div>
                    <span className="cursor-pointer" onClick={() => setSelectedItem('')}>
                        &times;
                    </span>
                    <img
                        src="../src/assets/img/muut/landscape/tostada2.jpg"
                        alt="Tostada"
                        width={'auto'}
                        className="rounded-md"
                    />
                    </div>
                    <div>
                    <h1>{item.name}</h1>
                    </div>
                    <div>
                    <p>
                        {item.description}
                    </p>
                    {item.allows_spice_custom === 1 && (
                        <div className="flex gap-2">
                        <button
                            className={spiceLevel === 1 ? "bg-red-300" : ""}
                            onClick={() => setSpiceLevel(1)}>
                            Mild
                        </button>
                        <button
                            className={spiceLevel === 2 ? "bg-red-300" : ""}
                            onClick={() => setSpiceLevel(2)}>
                            Medium
                        </button>
                        <button
                            className={spiceLevel === 3 ? "bg-red-300" : ""}
                            onClick={() => setSpiceLevel(3)}>
                            Spicy
                        </button>
                        </div>
                    )}
                    <div>
                        <label>
                        Lisätiedot:
                        <textarea
                            name="postContent"
                            rows={4}
                            cols={40}
                            defaultValue="Kirjoita lisätietoa allergioista tai tilauksesta..."
                            className="bg-neutral-50"
                        />
                        </label>
                    </div>
                    </div>
                        <div className="flex flex-row items-center gap-2">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <p>{quantity}</p>
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            <button onClick={() => handleAddToCart()}>Lisää ostoskoriin {price} €</button>
                        </div>
                </div>


            </Modal>
          )}
        
        </>
    )
}

export default AddToCart;