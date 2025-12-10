import { useEffect, useState } from "react";
import { useOrderContext } from "../../hooks/contextHook";
import Modal from '../Modal';

//lisää select protein

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const AddToCart = (props) => {
    useEffect(() => {

    })
    const {item, setSelectedItem} = props;
    const [quantity, setQuantity] = useState(1);
    const [spiceLevel, setSpiceLevel] = useState(1);
    const [price, setPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const {handleAddItem} = useOrderContext();
    const [protein, setProtein] = useState('beef'); //default

    useEffect(() => {
        setQuantity(1);
        setSpiceLevel(null);
        setInputValue('');
        setShowModal(true);
    }, [item]);

    useEffect(() => {
        if (item && quantity > 0) {
            item.quantity = quantity;
            const newPrice = (parseFloat(item.price) * quantity || parseFloat(item.special_price) * quantity);
            setPrice(newPrice.toFixed(2));
            setSpiceLevel(spiceLevel);
            console.log(item);
        }
    }, [item, quantity]);

    useEffect(() => {
    if (item) {
      item.selected_spice_level = spiceLevel;
      item.selected_protein = protein;
    }
    }, [spiceLevel, protein]);

    const handleInput = (event) => {
        setInputValue(event.target.value);
        item.special_request = inputValue;
    }

    const handleAddToCart = () => {
        handleAddItem(item);
        console.log(`${item.name} added to cart`);
        console.log(`${item.special_request}`)
        setSelectedItem('');
    }

    
    if (!item) return null;

    return (
        <>
            {item && (
                <Modal isOpen={showModal} onClose={() => setSelectedItem('')}>
                <div>
                    <div>
                    <img
                        src={API_UPLOADS_URL + item.image_url}
                        alt={item.description}
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
                    {item.available_proteins && (
                        <div className="flex gap-2">
                        <button
                            onClick={() => setProtein('chicken')}>
                            Kana (L, G)
                        </button>
                        <button
                            onClick={() => setProtein('beef')}>
                            Nauta (L, G)
                        </button>
                        <button
                            onClick={() => setProtein('vegan')}>
                            Kasviproteiini (VE, L, G)
                        </button>
                        <button
                            onClick={() => setProtein('shrimp')}>
                            Katkarapu (L, G)
                        </button>
                        </div>
                    )}
                    <div>
                        <label>
                        Lisätiedot:
                        <input onSubmit={(e) => handleInput(e)}
                            name="postContent"
                            rows={4}
                            cols={40}
                            placeholder="Kirjoita lisätietoa allergioista tai tilauksesta..."
                            className="bg-neutral-50"
                            value={inputValue}
                            onChange={(e) => handleInput(e)}
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