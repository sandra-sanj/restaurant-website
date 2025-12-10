import {useEffect, useState, useRef} from 'react';
import {useMenu, useAllergens} from '../../hooks/apiHook';
import useForm from '../../hooks/formHooks';

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const EditItem = ({onClose}) => {
  const {menuArray, modifyMenuItem} = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {allergens, getMenuItemAllergens} = useAllergens();
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [originalAllergens, setOriginalAllergens] = useState([]);

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const initValues = {
    nameFi: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: '',
    category: '',
    allergens: '',
    ingredients: '',
    isAvailable: false,
    spiceLevel: 0,
    allowsSpiceCustom: false,
    availableProteins: [],
    defaultProtein: '',
  };

  const proteins = [
    {id: 'chicken', name: 'Kana'},
    {id: 'beef', name: 'Nauta'},
    {id: 'vegan', name: 'Tofu'},
    {id: 'shrimp', name: 'Kala'},
  ];

  const spiceLevels = [0, 1, 2, 3, 4, 5];

  const handleEditItem = async (formData, itemId, originalName) => {
    const token = localStorage.getItem('token');

    // Debug: Näytä FormData sisältö
    console.log('FormData sisältö:', [...formData.entries()].length);
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }

    try {
      if (
        formData.name === '' ||
        formData.name_en === '' ||
        formData.description === '' ||
        formData.description_en === '' ||
        formData.price === ''
      ) {
        alert('Täytä kaikki kentät!');
        return;
      }

      if ([...formData.entries()].length === 0) {
        alert(
          'Mitään tietoa ei ole muokattu. Muokkaa yhtä tai useampaa tietoa.',
        );
        return;
      }

      const response = await modifyMenuItem(formData, itemId, token);
      console.log('Modify response', response);

      if (response) {
        alert(`"${formData.name ? formData.name : originalName}" muokattu.`);
        onClose();
        setSelectedItem(null);
      } else {
        alert(
          `Virhe: "${formData.name ? formData.name : originalName}" ei muokattu.`,
        );
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

      const formData = new FormData();
      // append only modified fields to formData
      if (parseInt(values.category) !== selectedItem.category_id)
        formData.append('category_id', parseInt(values.category));
      if (values.nameFi !== selectedItem.name)
        formData.append('name', values.nameFi);
      if (values.nameEn !== selectedItem.name_en)
        formData.append('name_en', values.nameEn);
      if (values.description !== selectedItem.description)
        formData.append('description', values.description);
      if (values.descriptionEn !== selectedItem.description_en)
        formData.append('description_en', values.descriptionEn);
      if (parseFloat(values.price) !== parseFloat(selectedItem.price))
        formData.append(
          'price',
          parseFloat(values.price.replace(',', '.')).toFixed(2),
        );

      if (parseInt(values.spiceLevel) !== parseInt(selectedItem.spice_level)) {
        formData.append('spice_level', parseInt(values.spiceLevel));
      }

      if (values.allowsSpiceCustom !== selectedItem.allows_spice_custom) {
        formData.append(
          'allows_spice_custom',
          values.allowsSpiceCustom ? 1 : 0,
        );
      }

      const proteinsDB = selectedItem.available_proteins
        ? selectedItem.available_proteins
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const proteinsUI = [...values.availableProteins].sort();
      const cleanDB = [...proteinsDB].sort();
      if (JSON.stringify(proteinsUI) !== JSON.stringify(cleanDB)) {
        formData.append('available_proteins', proteinsUI.join(', '));
      }

      if (values.defaultProtein !== selectedItem.default_protein) {
        formData.append('default_protein', values.defaultProtein);
      }

      if (values.ingredients !== selectedItem.ingredients)
        formData.append('ingredients', values.ingredients);

      const sortedAllergnsUI = [...selectedAllergens].sort();
      const sortedAllergensDB = [...originalAllergens].sort();
      if (
        JSON.stringify(sortedAllergnsUI) !== JSON.stringify(sortedAllergensDB)
      ) {
        formData.append('allergen_ids', JSON.stringify(sortedAllergnsUI));
      }

      if (values.isAvailable !== selectedItem.is_available)
        formData.append('is_available', values.isAvailable ? 1 : 0);

      // append image if selected
      if (imageFile) formData.append('file', imageFile);

      handleEditItem(formData, selectedItem.menu_item_id, values.nameFi); // Callback
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

      handleInputChange({
        target: {name: 'isAvailable', value: selectedItem.is_available},
      });

      handleInputChange({
        target: {name: 'ingredients', value: selectedItem.ingredients},
      });

      handleInputChange({
        target: {name: 'spiceLevel', value: selectedItem.spice_level || 0},
      });

      handleInputChange({
        target: {
          name: 'allowsSpiceCustom',
          value: selectedItem.allows_spice_custom || false,
        },
      });

      handleInputChange({
        target: {
          name: 'availableProteins',
          value: selectedItem.available_proteins
            ? selectedItem.available_proteins
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s && s !== 'null') // remove empty and null
            : [],
        },
      });

      handleInputChange({
        target: {
          name: 'defaultProtein',
          value: selectedItem.default_protein || '',
        },
      });

      // get allergens
      getMenuItemAllergens(selectedItem.menu_item_id).then(
        (allergenObjects) => {
          const ids = allergenObjects.map((a) => a.allergen_id);
          setSelectedAllergens(ids);
          setOriginalAllergens(ids);
        },
      );
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
          <div className="flex flex-col p-4 gap-4 bg-white w-[400px] *:flex *:flex-col *:gap-1">
            <label>
              Nimi:
              <input
                name="nameFi"
                value={inputs.nameFi}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>
            <label>
              Nimi englanniksi:
              <input
                name="nameEn"
                value={inputs.nameEn}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>
            <label>
              Kuvaus:
              <input
                name="description"
                value={inputs.description}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>
            <label>
              Kuvaus englanniksi:
              <input
                name="descriptionEn"
                value={inputs.descriptionEn}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>
            <label>
              Ainesosat:
              <input
                name="ingredients"
                value={inputs.ingredients}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
                type="text"
              />
            </label>
            <label>
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
            <div>
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
            {/* Tulisuus */}
            <div>
              <p>Tulisuus:</p>

              <select
                name="spiceLevel"
                value={inputs.spiceLevel}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
              >
                {spiceLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-1 mt-1">
                <input
                  type="checkbox"
                  name="allowsSpiceCustom"
                  checked={inputs.allowsSpiceCustom}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: 'allowsSpiceCustom',
                        value: e.target.checked,
                      },
                    })
                  }
                />
                Salli tulisuuden muokkaus
              </label>
            </div>

            {/* Proteiinit */}
            <div>
              <p>Proteiinit:</p>
              {/* proteiinien checkboxit */}
              <div className="flex flex-wrap gap-2">
                {proteins.map((protein) => (
                  <label key={protein.id} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={
                        inputs.availableProteins
                          ? inputs.availableProteins.includes(protein.id)
                          : false
                      }
                      onChange={(e) => {
                        const current = inputs.availableProteins || [];
                        const updated = e.target.checked
                          ? [...current, protein.id]
                          : current.filter((p) => p !== protein.id);

                        handleInputChange({
                          target: {name: 'availableProteins', value: updated},
                        });

                        // reset default if removed
                        if (!updated.includes(inputs.defaultProtein)) {
                          handleInputChange({
                            target: {name: 'defaultProtein', value: ''},
                          });
                        }
                      }}
                    />
                    {protein.name}
                  </label>
                ))}
              </div>

              <p className="mt-2">Oletusproteiini:</p>
              <select
                name="defaultProtein"
                value={inputs.defaultProtein || ''}
                onChange={handleInputChange}
                className="bg-stone-100 p-1 rounded"
              >
                <option value="">Ei valittu</option>

                {(inputs.availableProteins || []).map((id) => {
                  const protein = proteins.find((p) => p.id === id);
                  return (
                    protein && (
                      <option key={id} value={id}>
                        {protein.name}
                      </option>
                    )
                  );
                })}
              </select>
            </div>

            {/* Ruokavaliot */}
            <div>
              <p>Ruokavaliot:</p>
              <div className="flex flex-wrap gap-2">
                {allergens &&
                  allergens.map((allergen) => (
                    <label
                      key={allergen.allergen_id}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAllergens.includes(
                          allergen.allergen_id,
                        )}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...selectedAllergens, allergen.allergen_id]
                            : selectedAllergens.filter(
                                (id) => id !== allergen.allergen_id,
                              );
                          setSelectedAllergens(updated);
                        }}
                      />
                      {allergen.code}
                    </label>
                  ))}
              </div>
            </div>

            {/* Saatavuus */}
            <div>
              <label>
                Saatavuus:
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={inputs.isAvailable}
                  onChange={(e) =>
                    handleInputChange({
                      target: {name: 'isAvailable', value: e.target.checked},
                    })
                  }
                />
              </label>
            </div>
            {/* Kuva */}
            <div className="img:">
              <p>Kuva:</p>
              <input
                name="image"
                type="file"
                className="bg-stone-100 p-1 rounded"
                onChange={handleImageChange}
                ref={fileInputRef}
              />

              {imageFile && (
                <button
                  type="button"
                  className="text-red-600 underline text-sm"
                  onClick={() => {
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = null;
                  }}
                >
                  Peruuta
                </button>
              )}

              {/* Näytä lisätty kuva */}
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="food"
                  className="w-24 h-24 object-cover border rounded"
                />
              )}

              {/* Näytä nykyinen kuva kun kuvaa ei ole päivitetty */}
              {!imageFile && selectedItem?.image_thumb_url && (
                <div className="flex flex-col mt-2">
                  <p>Nykyinen kuva:</p>
                  <img
                    src={`${API_UPLOADS_URL}/${selectedItem.image_thumb_url}`}
                    alt="Current"
                    className="w-24 h-24 object-cover border rounded"
                  />
                </div>
              )}
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
