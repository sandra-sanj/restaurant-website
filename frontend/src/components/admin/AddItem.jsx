import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook.js';
import useForm from '../../hooks/formHooks.js';

// TODO: lisää spice-levels yms puuttuvat kohdat
// TODO: lähetä allergeenit erillisenä POST-pyyntönä

const AddItem = ({onClose}) => {
  //const [item, setItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {addMenuItem} = useMenu();

  /*const handleItemChange = (event) => {
    setItem(event.target.files[0]);
    console.log('item state', item);
  };*/

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const initValues = {
    nameFi: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: 0,
    category: 1, // Default value
    lactoseFree: false, // checkboxes
    glutenFree: false,
    milkFree: false,
    vegan: false,
    isAvailable: true,
  };

  const doAddItem = async (inputs) => {
    console.log('doAddItem:', inputs);

    if (
      !inputs.nameFi ||
      !inputs.nameEn ||
      !inputs.description ||
      !inputs.descriptionEn ||
      !inputs.price
    ) {
      alert('Täytä kaikki kentät!');
      return;
    }

    // Check that price is numeric
    if (isNaN(parseFloat(inputs.price))) {
      alert('Syötä hinta numerona, esim. 10.90 tai 10,90');
      return;
    }

    if (!imageFile) {
      alert('Kuva on pakollinen!');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('category_id', parseInt(inputs.category));
      formData.append('name', inputs.nameFi);
      formData.append('name_en', inputs.nameEn);
      formData.append('description', inputs.description || '');
      formData.append('description_en', inputs.descriptionEn || '');
      formData.append(
        'price',
        parseFloat(inputs.price.replace(',', '.')).toFixed(2),
      );
      formData.append('ingredients', '-');
      formData.append('spice_level', 0);
      formData.append('allows_spice_custom', 0);
      formData.append('available_proteins', 0);
      formData.append('default_protein', 0);
      formData.append('is_available', inputs.isAvailable);
      formData.append('file', imageFile);

      // Debug: Näytä FormData sisältö
      console.log('FormData sisältö:');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
      }

      const newItemResponse = await addMenuItem(formData, token);

      if (newItemResponse !== null && newItemResponse !== undefined) {
        alert(`Tuote "${inputs.nameFi}" lisätty`);
        onClose();
        setImageFile(null);
      } else {
        alert(`Virhe tuotteen "${inputs.nameFi}" lisäämisessä`);
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Virhe tuotteen lisäämisessä: ' + error.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs, resetForm} = useForm(
    doAddItem,
    initValues,
  );

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center text-white p-4 rounded-t-md bg-[#2A4B11]!">
          <p className="font-bold">Lisää tuote</p>
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
              id="nameFi"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <label className="flex flex-col gap-1">
            Nimi englanniksi:
            <input
              name="nameEn"
              className="bg-stone-100 p-1 rounded"
              id="nameEn"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <label className="flex flex-col gap-1">
            Kuvaus:
            <input
              name="description"
              className="bg-stone-100 p-1 rounded"
              id="description"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <label className="flex flex-col gap-1">
            Kuvaus englanniksi:
            <input
              name="descriptionEn"
              className="bg-stone-100 p-1 rounded"
              id="descriptionEn"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <label className="flex flex-col gap-1">
            Hinta (€):
            <input
              name="price"
              className="bg-stone-100 p-1 rounded"
              id="price"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <div className="flex flex-col gap-1">
            <p>Kategoria:</p>
            <select
              name="category"
              className="bg-stone-100 p-1 rounded"
              value={inputs.category}
              onChange={handleInputChange}
            >
              <option value={1}>Snacks</option>
              <option value={2}>Mains</option>
              <option value={3}>Desserts</option>
              <option value={4}>Drinks</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p>Ruokavaliot:</p>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                L
                <input
                  type="checkbox"
                  name="lactoseFree"
                  checked={inputs.lactoseFree || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: e.target.name, value: e.target.checked},
                    })
                  }
                />
              </label>

              <label className="flex items-center gap-1">
                G
                <input
                  type="checkbox"
                  name="glutenFree"
                  checked={inputs.glutenFree || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: e.target.name, value: e.target.checked},
                    })
                  }
                />
              </label>

              <label className="flex items-center gap-1">
                M
                <input
                  type="checkbox"
                  name="milkFree"
                  checked={inputs.milkFree || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: e.target.name, value: e.target.checked},
                    })
                  }
                />
              </label>

              <label className="flex items-center gap-1">
                VEG
                <input
                  type="checkbox"
                  name="vegan"
                  checked={inputs.vegan || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: e.target.name, value: e.target.checked},
                    })
                  }
                />
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1">
                Is Available
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={inputs.isAvailable || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: e.target.name, value: e.target.checked},
                    })
                  }
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>Kuva:</p>
            <input
              name="image"
              type="file"
              id="image"
              className="bg-stone-100 p-1 rounded"
              onChange={handleImageChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-[#2A4B11]! text-white py-2 rounded hover:opacity-90"
          >
            Lisää
          </button>
        </div>
      </div>
    </>
  );
};

export default AddItem;
