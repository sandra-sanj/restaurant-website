const FoodCardPortrait = () => {
  return (
    <>
      <div className="bg-white-50 w-[600px] h-[400px] rounded-md mb-5 flex flex-row outline-2 outline-gray-400">
        <div className="h-[400px] overflow-hidden">
          <img
            src="../src/assets/img/muut/tostada.jpg"
            alt="Tostada"
            height={'400px'}
            width={'auto'}
            className="rounded-md"
          />
        </div>
        <div className="w-[200%]">
          <div>
            <h2>Kanatacot x 3</h2>
            <button>i</button>
          </div>
          <p>
            Tämä on toinen ruokakortti, jossa kuva on vasemmalla ja pystysuorassa
          </p>
          <br />
          <p>Tekstiä on lisää jeejee</p>
          <p>Tekstiä</p>
          <p>Tekstiä</p>
          <p>Tekstiä</p>
          <p>Tekstiä</p>
          <br />

          <div>
            <p>13,90 €</p>
            <button>+ Lisää tilaukseen</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCardPortrait;
