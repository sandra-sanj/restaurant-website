import {useState} from 'react';
import FoodModal from './FoodModal';

const FoodCard = () => {
  const [foodModalOpen, setFoodModalOpen] = useState(false);

  const handleButtonClick = () => {
    setFoodModalOpen(false);
  }

  return (
    <>
      {foodModalOpen && <FoodModal onSubmit={handleButtonClick} onClose={handleButtonClick}/>}

      <div className="bg-white-50 w-[500px] h-[550px] rounded-md mb-5 outline-2 outline-gray-400">
        <img
          src="../src/assets/img/muut/tostada-liha-ehka-vege.jpg"
          alt="Churro"
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>Kanatacot x 3</h2>
          <button>i</button>
        </div>

        <p>
          Tämä on ruokakortti ja tässä on joku kuvaus ruoasta. i = infonappi
          (voisi olla myös span?)
        </p>
        <p>13,90 €</p>
        <button onClick={() => setFoodModalOpen(true)}>+ Lisää tilaukseen</button>
      </div>
    </>
  );
};

export default FoodCard;

// flex-row asettaa divit vierekkäin
/*
const FoodCard = () => {
  return (
    <>
      <div className="bg-blue-100 w-[500px] h-[550px] rounded-md mb-5">
        <img
          src="../src/assets/img/muut/tostada-liha-ehka-vege.jpg"
          alt="Churro"
          width={'auto'}
          className="rounded-md"
        />
        <div className="flex flex-row">
          <h2>Kanatacot x 3</h2>
          <button>i</button>
        </div>

        <p>
          Tämä on ruokakortti ja tässä on joku kuvaus ruoasta. i = infonappi
          (voisi olla myös span?)
        </p>
        <div className="flex flex-row">
          <p>13,90 €</p>
          <button>+ Lisää tilaukseen</button>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
*/
