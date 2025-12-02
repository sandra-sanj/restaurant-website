import {useState} from 'react';
import FoodModal from './FoodModal';
import InfoCard from './InfoCard';

const HighlightCard = () => {
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [infoCardOpen, setInfoCardOpen] = useState(false);

  const handleButtonClick = () => {
    setFoodModalOpen(false);
    setInfoCardOpen(false);
  };

  const handleAddToCartClick = () => {
    console.log('Lisää ostoskoriin pressed');
  };

  return (
    <>
      {foodModalOpen && (
        <FoodModal onAddToCart={handleAddToCartClick} onClose={handleButtonClick} />
      )}
      {infoCardOpen && <InfoCard onClose={handleButtonClick} />}

      <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-10 outline-red-800">
        <img
          src="../src/assets/img/muut/landscape/tostada2.jpg"
          alt="Tostada"
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>Kanatacot x 3</h2>
          <p>Päivän lounas</p>
          <button onClick={() => setInfoCardOpen(true)}>i</button>
        </div>

        <p>
          Tämä on ruokakortti ja tässä on joku kuvaus ruoasta. i = infonappi
          (voisi olla myös span?)
        </p>
        <p>13,90 €</p>
        <button onClick={() => setFoodModalOpen(true)}>
          + Lisää tilaukseen
        </button>
      </div>
    </>
  );
};

export default HighlightCard;
