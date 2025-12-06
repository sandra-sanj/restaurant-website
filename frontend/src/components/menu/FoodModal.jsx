const FoodModal = ({onAddToCart, onClose}) => {
  //const FoodModal = ({props}) => {

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md w-[500px]">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
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
          <h1>FoodModal</h1>
          <h2>Ruoan nimi</h2>
        </div>
        <div>
          <p>
            kuvaus: tähän tulee ruoan kuvaus, ja tämä avautuu jos painaa
            ruokakortin Lisää tilaukseen-nappia
          </p>
          <p>Tulisuus: X X X </p>
          <div>
            <label>
              Lisätiedot:
              <textarea
                name="postContent"
                rows={4}
                cols={40}
                defaultValue="Tämä on tekstikenttä"
                className="bg-neutral-50"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row">
          <button>-</button>
          <p>1</p> {/* Tähän tulee määrä jota voi muokata */}
          <button>+</button>
          <button onClick={onAddToCart}>Lisää ostoskoriin 14,50 €</button>
        </div>
      </div>
    </>
  );
};

export default FoodModal;
