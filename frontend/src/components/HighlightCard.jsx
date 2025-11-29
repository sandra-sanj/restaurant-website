
const HighlightCard = () => {
  return (
    <>
      <div className="bg-white-50 w-[500px] h-[550px] rounded-md mb-5 outline-10 outline-red-800">
        <img
          src="../src/assets/img/muut/tostada-liha-ehka-vege.jpg"
          alt="Churro"
          width={'auto'}
          className="rounded-md"
        />
        <div>
          <h2>Kanatacot x 3</h2>
          <p>Päivän lounas</p>
          <button>i</button>
        </div>

        <p>
          Tämä on ruokakortti ja tässä on joku kuvaus ruoasta. i = infonappi
          (voisi olla myös span?)
        </p>
        <p>13,90 €</p>
        <button>+ Lisää tilaukseen</button>
      </div>
    </>
  );
};

export default HighlightCard
