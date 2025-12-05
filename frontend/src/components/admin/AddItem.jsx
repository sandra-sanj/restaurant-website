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
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <p className="font-bold">Lisää tuote (header)</p>
        </div>
        <div className="flex flex-col">
          <label className="mb-3">
            Nimi:
            <input
              name="nameFi"
              className="bg-stone-100"
              id="nameFi"
              type="text"
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-3">
            Nimi englanniksi:
            <input
              name="nameEn"
              className="bg-stone-100"
              id="nameEn"
              type="text"
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-3">
            Kuvaus:
            <input
              name="description"
              className="bg-stone-100"
              id="description"
              type="text"
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-3">
            Kuvaus englanniksi:
            <input
              name="descriptionEn"
              className="bg-stone-100"
              id="descriptionEn"
              type="text"
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-3">
            Hinta (€):
            <input
              name="price"
              className="bg-stone-100"
              id="price"
              type="text"
              onChange={handleInputChange}
            />
          </label>

          <div className="mb-3">
            <p>Kategoria:</p>
            <select
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
            >
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
                name="lactoseFree"
                checked={inputs.lactoseFree || false}
                onChange={(e) =>
                  handleInputChange({
                    target: {name: e.target.name, value: e.target.checked},
                  })
                }
              />
            </label>
            <label>
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
            <label>
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
            <label>
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

          <label className="mb-3">
            Kuva:
            <input
              name="image"
              type="file"
              id="image"
              className="bg-stone-100"
            />
          </label>
          <button onClick={handleSubmit}>Lisää</button>
        </div>
      </div>
    </>
  );
};

export default AddItem;
