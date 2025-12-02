const AddItem = ({onClose}) => {
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <p className="font-bold">Lisää tuote (header)</p>
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

          <div className="mb-3">
            <p>Kategoria:</p>
            <select name="category">
              <option value="snacks">Snacks</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="mb-3">
            <p>Ruokavaliot:</p>
            <label>
              L
              <input
                type="checkbox"
                //checked={inputs.lactoseFree}
                name="lactoseFree"
              />
            </label>
            <label>
              G
              <input
                type="checkbox"
                //checked={inputs.glutenFree}
                name="glutenFree"
              />
            </label>
            <label>
              M
              <input
                type="checkbox"
                //checked={inputs.milkFree}
                name="milkFree"
              />
            </label>
            <label>
              VEG
              <input
                type="checkbox"
                //checked={inputs.vegan}
                name="vegan"
              />
            </label>
          </div>

          <label className="mb-3">
            Kuva:
            <input name="image" className="bg-stone-100" />
          </label>
          <button>Lisää</button>
        </div>
      </div>
    </>
  );
};

export default AddItem;
