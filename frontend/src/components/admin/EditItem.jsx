
const EditItem = ({onClose}) => {
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <p className="font-bold">Muokkaa tuotetta (header)</p>
        </div>
        <div className="flex flex-col">
          <label className="mb-3">
            Nimi:
            <input name="nameFi" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Nimi englanniksi:
            <input name="nameEn" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Kuvaus:
            <input name="description" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Kuvaus englanniksi:
            <input name="descriptionEn" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Hinta (€):
            <input name="price" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Kategoria (alasvetovalikko):
            <input name="category" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Ruokavaliot (alasvetovalikko):
            <input name="diets" className="bg-stone-100" />
          </label>
          <label className="mb-3">
            Kuva:
            <input name="image" className="bg-stone-100" />
          </label>
          <button>Vahvista</button>
        </div>
      </div>
    </>
  );
};

export default EditItem;
