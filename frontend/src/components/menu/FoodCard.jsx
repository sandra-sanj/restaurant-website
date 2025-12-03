import {useState} from 'react';
import FoodModal from './FoodModal';
import InfoCard from './InfoCard';
import { Link } from 'react-router';

const FoodCard = ({item}) => {
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [infoCardOpen, setInfoCardOpen] = useState(false);

  const handleButtonClick = () => {
    setFoodModalOpen(false);
    setInfoCardOpen(false);
  };

  const handleAddToCartClick = () => {
    console.log('Lisää ostoskoriin pressed');
  };

  const handleInfoClick = () => {
    console.log('Info pressed');
    setInfoCardOpen(false);
  }

  return (
    <>
      {foodModalOpen && (
        <FoodModal
          onAddToCart={handleAddToCartClick}
          onClose={handleButtonClick}
        />
      )}

      {infoCardOpen && <InfoCard onClose={handleButtonClick} />}

      <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-2 outline-gray-400">
        <img
          src={item.image_url}
          alt={item.description}
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>{item.name}</h2>
          <button onClick={() => setInfoCardOpen(true)}>i</button>
        </div>

        <p>
          {item.description}
        </p>
        <p>{item.price}</p>
        <button onClick={() => setFoodModalOpen(true)}>
          + Lisää tilaukseen
        </button>
      </div>
    </>
  );
};

export default FoodCard;
