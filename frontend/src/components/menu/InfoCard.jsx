const InfoCard = ({onClose}) => {
  const {item, setSelectedItem} = props;
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
        <div>
          <h2 className="font-bold">Info-kortti</h2>
          <h2>Ruoan nimi</h2>
          <p>Ruoan kuvaus lukee tässä </p>
          <p>Ainesosat: </p>
          <p>Allergeenit: </p>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
