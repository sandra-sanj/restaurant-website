const FoodModal = ({onAddToCart, onClose}) => {
  //const FoodModal = ({props}) => {

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>&times;</span>
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
          <p>Tulisuus: X X X (jos ruoassa mahdollista säätää)</p>
          <p>Lisätiedot: tähän tulee tekstikenttä</p>
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
