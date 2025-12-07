import {useState} from 'react';
import FoodModal from './oldAddToCart';
import InfoCard from './InfoCard';
import { Link } from 'react-router';
import ShowCards from './ShowCards';

const FoodCard = (props) => {
  const { item, setSelectedItem} = props;


  return (
    <>

      <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-2 outline-gray-400">
        <img
          src={item.image_url}
          alt={item.description}
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>{item.name}</h2>
          <button>i</button>
        </div>

        <p>
          {item.description}
        </p>
        <p>{item.price}</p>
        <button onClick={() => setSelectedItem(item)}>Lisää ostoskoriin</button>
      </div>
    </>
  );
};

//<Link to='/addtocard'A></Link>
export default FoodCard;
