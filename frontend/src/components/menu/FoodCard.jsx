const FoodCard = (props) => {
  const {item, setSelectedItem} = props;

  const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

  return (
    <>
      <div className="bg-white-50 w-[500px] rounded-md mb-5 outline-2 outline-gray-400">
        <img
          src={API_UPLOADS_URL + item.image_thumb_url}
          alt={item.description}
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>{item.name}</h2>
          <button>i</button>
        </div>

        <p>{item.description}</p>
        <p>{item.price}</p>
        <button onClick={() => setSelectedItem(item)}>Lisää ostoskoriin</button>
      </div>
    </>
  );
};

//<Link to='/addtocard'A></Link>
export default FoodCard;
