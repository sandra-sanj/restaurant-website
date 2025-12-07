import { useEffect, useState } from "react";


const isItemSpicy = (item) => {
    const [spiceLevel, setSpiceLevel] = useState(null);

    useEffect(() => {
        item.spice_level = spiceLevel;
        console.log(spiceLevel);
    }, [spiceLevel]);

    //TODO: lisää proteiinin muokkaus niihin, mihin mahdollista
    //lisää useEffect, jotta klikattaessa muuttuu punaiseksi
    if (!item) {
        return null;
    }

    if (item.allows_spice_custom === 1)
        return item && (
        <>
            <button onClick={() => setSpiceLevel(1)}>Mild</button>
            <button onClick={() => setSpiceLevel(2)}>Medium</button>
            <button onClick={() => setSpiceLevel(3)}>Spicy</button>
        </>
    )
};

const AddToCart = (props) => {
    const {item, setSelectedItem} = props;

    return (
        <>
          {item && (
            <dialog open>
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
                    {isItemSpicy(item)}
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

                    <div className="flex flex-row">
                    <button>-</button>
                    <p>1</p> {/* Tähän tulee määrä jota voi muokata */}
                    <button>+</button>
                    <button>Lisää ostoskoriin {item.price} €</button>
                    </div>
                </div>


                
            </dialog>
          )}
        
        </>
    )
}

export default AddToCart;