import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook.js';
import useForm from '../../hooks/formHooks.js';

const AddItem = ({onClose}) => {
  const [item, setItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {addMenuItem} = useMenu();

  const initValues = {
    nameFi: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: '',
    category: '',
    //lactoseFree: false, // checkboxes
    //glutenFree: false,
    //milkFree: false,
    //vegan: false,
  };

  const doAddItem = async (inputs) => {
    console.log('doAddItem:', inputs);

    const token = localStorage.getItem('token');
    //console.log('token', token);

    /*
    try {
      const itemData = {
        image: null,
      };
*/
    try {
      // Send only the essential fields, no image, no checkboxes
      const itemData = {
        category_id: 1, // kovakoodattu
        name: inputs.nameFi,
        name_en: inputs.nameEn,
        description: inputs.description,
        description_en: inputs.descriptionEn,
        price: inputs.price,
        image_url: null,
        image_thumb_url: null,
        is_available: 1,
      };

      console.log('itemdata', itemData);
      const newItem = await addMenuItem(itemData, token);
      console.log('Menu item added:', newItem);

      alert('Item added successfully');

      // Clear the form
      //resetForm();
    } catch (error) {
      console.log('Failed to add item:', error);
    }
  };

  const handleItemChange = (event) => {
    setItem(event.target.files[0]);
    console.log('item state', item);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const {handleSubmit, handleInputChange, inputs, resetForm} = useForm(
    doAddItem,
    initValues,
  );

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-secondary text-secondary-foreground p-4 rounded-t-md">
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
              <option value="snacks">Snacks</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
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
            className="mt-4 bg-secondary text-secondary-foreground py-2 rounded hover:opacity-90"
          >
            Lisää
          </button>
        </div>
      </div>
    </>
  );
};

export default AddItem;
