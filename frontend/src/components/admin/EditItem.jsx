const EditItem = ({ onClose }) => {
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">

        {/* Header */}
        <div className="flex justify-between items-center bg-[#2A4B11]! text-white p-4 rounded-t-md">
          <p className="font-bold">Muokkaa tuotetta</p>
          <span
            className="cursor-pointer font-bold text-lg hover:text-gray-400"
            onClick={onClose}
          >
            &times;
          </span>
        </div>

        {/* Form */}
        <div className="flex flex-col p-4 gap-4 bg-white w-[400px]">

          <label className="flex flex-col gap-1">
            Nimi:
            <input
              name="nameFi"
              className="bg-stone-100 p-1 rounded"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-1">
            Nimi englanniksi:
            <input
              name="nameEn"
              className="bg-stone-100 p-1 rounded"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-1">
            Kuvaus:
            <input
              name="description"
              className="bg-stone-100 p-1 rounded"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-1">
            Kuvaus englanniksi:
            <input
              name="descriptionEn"
              className="bg-stone-100 p-1 rounded"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-1">
            Hinta (€):
            <input
              name="price"
              className="bg-stone-100 p-1 rounded"
              type="text"
            />
          </label>

          {/* Kategoria */}
          <div className="flex flex-col gap-1">
            <p>Kategoria:</p>
            <select
              name="category"
              className="bg-stone-100 p-1 rounded"
            >
              <option value="snacks">Snacks</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Ruokavaliot */}
          <div className="flex flex-col gap-2">
            <p>Ruokavaliot:</p>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                L
                <input type="checkbox" name="lactoseFree" />
              </label>

              <label className="flex items-center gap-1">
                G
                <input type="checkbox" name="glutenFree" />
              </label>

              <label className="flex items-center gap-1">
                M
                <input type="checkbox" name="milkFree" />
              </label>

              <label className="flex items-center gap-1">
                VEG
                <input type="checkbox" name="vegan" />
              </label>
            </div>
          </div>

          {/* Kuva */}
          <div className="flex flex-col gap-1">
            <p>Kuva:</p>
            <input
              name="image"
              type="file"
              className="bg-stone-100 p-1 rounded"
            />
          </div>

          <button className="mt-4 bg-[#2A4B11]! text-white py-2 rounded hover:opacity-90">
            Vahvista
          </button>

        </div>
      </div>
    </>
  );
};

export default EditItem;

