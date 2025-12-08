import {useEffect, useState} from 'react';
import {useMenu} from '../../hooks/apiHook';
import useForm from '../../hooks/formHooks';

// TODO: hae allergeenit erillisenä pyyntönä
// TODO: toteuta kuvan lisäys -> tarvitsee formData-objektin!

const EditItem = ({onClose}) => {
  const {menuArray, modifyMenuItem} = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);

  const initValues = {
    nameFi: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: '',
    category: '',
    lactoseFree: false,
    glutenFree: false,
    milkFree: false,
    vegan: false,
  };

  const handleEditItem = async (itemData) => {
    const token = localStorage.getItem('token');

    try {
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

      const editedPrice = itemData.price.toString().replace(',', '.');

      // Check that price is numeric
      if (isNaN(parseFloat(editedPrice))) {
        alert('Syötä hinta numerona, esim. 10.90 tai 10,90');
        return;
      }

      itemData.price = parseFloat(editedPrice).toFixed(2);

      const response = await modifyMenuItem(itemData, token);
      console.log('Modify response', response);

      if (response) {
        alert(`"${itemData.name}" muokattu.`);
      } else {
        alert(`Virhe: "${itemData.name}" ei muokattu.`);
      }
    } catch (e) {
      console.error('Modify failed', e);
    }
  };

  const {handleSubmit, handleInputChange, inputs, resetForm} = useForm(
    (values) => {
      if (!selectedItem) {
        return;
      }

      // Fill form with selected item values
      const itemData = {
        menu_item_id: selectedItem.menu_item_id,
        category_id: parseInt(values.category),
        name: values.nameFi,
        name_en: values.nameEn,
        description: values.description,
        description_en: values.descriptionEn,
        price: values.price,
        image_url: null,
        image_thumb_url: null,
        is_available: 1,
      };

      handleEditItem(itemData); // Callback
    },

    initValues,
  );

  // Set item values to form
  useEffect(() => {
    if (selectedItem) {
      handleInputChange({target: {name: 'nameFi', value: selectedItem.name}});
      handleInputChange({
        target: {name: 'nameEn', value: selectedItem.name_en},
      });
      handleInputChange({
        target: {name: 'description', value: selectedItem.description},
      });
      handleInputChange({
        target: {name: 'descriptionEn', value: selectedItem.description_en},
      });

      handleInputChange({target: {name: 'price', value: selectedItem.price}});
      
      handleInputChange({
        target: {name: 'category', value: selectedItem.category_id},
      });
    } else {
      resetForm();
    }
  }, [selectedItem]);

  return (
    <>
      {/* Dropdown menu */}
      <label className="flex flex-col gap-1">
        <select
          value={selectedItem?.menu_item_id || ''}
          onChange={(e) => {
            const item = menuArray.find(
              (i) => i.menu_item_id.toString() === e.target.value,
            );
            setSelectedItem(item || null);
          }}
          className="bg-stone-100 p-1 rounded"
        >
          <option value="">Valitse muokattava tuote</option>
          {menuArray.map((item) => (
            <option key={item.menu_item_id} value={item.menu_item_id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      {/* Edit form - show when item is selected*/}
      {selectedItem && (
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
                value={inputs.nameFi}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>

            <label className="flex flex-col gap-1">
              Nimi englanniksi:
              <input
                name="nameEn"
                value={inputs.nameEn}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>

            <label className="flex flex-col gap-1">
              Kuvaus:
              <input
                name="description"
                value={inputs.description}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>

            <label className="flex flex-col gap-1">
              Kuvaus englanniksi:
              <input
                name="descriptionEn"
                value={inputs.descriptionEn}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>

            <label className="flex flex-col gap-1">
              Hinta (€):
              <input
                name="price"
                value={inputs.price}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>

            {/* Kategoria */}
            <div className="flex flex-col gap-1">
              <p>Kategoria:</p>
              <select
                name="category"
                value={inputs.category}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
              >
                <option value={1}>Snacks</option>
                <option value={2}>Mains</option>
                <option value={3}>Desserts</option>
                <option value={4}>Drinks</option>
              </select>
            </div>

            {/* Ruokavaliot */}
            <div className="flex flex-col gap-2">
              <p>Ruokavaliot:</p>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-1">
                  L
                  <input
                    type="checkbox"
                    name="lactoseFree"
                    checked={inputs.lactoseFree}
                    onChange={(e) =>
                      handleInputChange({
                        target: {name: 'lactoseFree', value: e.target.checked},
                      })
                    }
                  />
                </label>

                <label className="flex items-center gap-1">
                  G
                  <input
                    type="checkbox"
                    name="glutenFree"
                    checked={inputs.glutenFree}
                    onChange={(e) =>
                      handleInputChange({
                        target: {name: 'glutenFree', value: e.target.checked},
                      })
                    }
                  />
                </label>

                <label className="flex items-center gap-1">
                  M
                  <input
                    type="checkbox"
                    name="milkFree"
                    checked={inputs.milkFree}
                    onChange={(e) =>
                      handleInputChange({
                        target: {name: 'milkFree', value: e.target.checked},
                      })
                    }
                  />
                </label>

                <label className="flex items-center gap-1">
                  VEG
                  <input
                    type="checkbox"
                    name="vegan"
                    checked={inputs.vegan}
                    onChange={(e) =>
                      handleInputChange({
                        target: {name: 'vegan', value: e.target.checked},
                      })
                    }
                  />
                </label>
              </div>
            </div>

            {/* Kuva - TODO: lisää logiikka*/}
            <div className="flex flex-col gap-1">
              <p>Kuva:</p>
              <input
                name="image"
                type="file"
                className="bg-stone-100 p-1 rounded"
              />
            </div>

            <button
              className="mt-4 bg-[#2A4B11]! text-white py-2 rounded hover:opacity-90"
              onClick={handleSubmit}
            >
              Vahvista
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditItem;
