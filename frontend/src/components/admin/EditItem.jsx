import {useEffect, useState} from 'react';
import {useMenu, useAllergens} from '../../hooks/apiHook';
import useForm from '../../hooks/formHooks';
import {
  FormField,
  CategorySelector,
  SpiceLevelSelector,
  ProteinSelector,
  AllergenSelector,
  AvailabilityToggle,
  ImageUploadPreview,
} from './ItemFormFields.jsx';

const API_UPLOADS_URL = import.meta.env.VITE_API_UPLOADS_URL;

const EditItem = ({onClose}) => {
  const {menuArray, modifyMenuItem} = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {allergens, getMenuItemAllergens} = useAllergens();
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [originalAllergens, setOriginalAllergens] = useState([]);

  const initValues = {
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    price: '',
    category_id: 1,
    is_available: true,
    spice_level: 0,
    allows_spice_custom: false,
    available_proteins: [],
    default_protein: '',
    ingredients: '',
  };

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
      if (!selectedItem) return;

      const formData = new FormData();

      // format price
      const normalizePrice = (value) =>
        parseFloat(value.toString().replace(',', '.')).toFixed(2);

      // sort proteins alphabetically
      const normalizeProteins = (value) =>
        Array.isArray(value)
          ? [...value].sort()
          : (value
              ?.split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .sort() ?? []);

      // add fields only if modified
      Object.keys(initValues).forEach((key) => {
        const uiValue = values[key]; // value of item in ui
        let dbValue = selectedItem[key]; // current value of item in database

        switch (key) {
          case 'price': {
            const ui = normalizePrice(uiValue);
            const db = normalizePrice(dbValue);
            if (ui !== db) formData.append(key, ui);
            break;
          }

          case 'allows_spice_custom':
          case 'is_available': {
            const ui = uiValue ? 1 : 0;
            const db = dbValue ? 1 : 0;
            if (ui !== db) formData.append(key, ui);
            break;
          }

          case 'available_proteins': {
            const ui = normalizeProteins(uiValue);
            const db = normalizeProteins(dbValue);
            if (JSON.stringify(ui) !== JSON.stringify(db)) {
              formData.append(key, ui.join(', '));
            }
            break;
          }

          default: {
            if (uiValue !== dbValue) formData.append(key, uiValue);
          }
        }
      });

      // allergens
      const sortedAllergensUI = [...selectedAllergens].sort();
      const sortedAllergensDB = [...originalAllergens].sort();
      if (
        JSON.stringify(sortedAllergensUI) !== JSON.stringify(sortedAllergensDB)
      ) {
        formData.append('allergen_ids', JSON.stringify(sortedAllergensUI));
      }

      // add image if selected
      if (imageFile) formData.append('file', imageFile);

      handleEditItem(formData, selectedItem.menu_item_id, values.name); // Callback
    },

    initValues,
  );

  // convert item to form value
  const mapSelectedItemToFormValues = (item) =>
    Object.fromEntries(
      Object.keys(initValues).map((key) => {
        if (key === 'available_proteins') {
          return [
            key,
            item[key]
              ? item[key]
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [],
          ];
        }
        return [key, item[key] ?? initValues[key]];
      }),
    );

  // Set item values to form
  useEffect(() => {
    if (selectedItem) {
      const values = mapSelectedItemToFormValues(selectedItem);

      Object.entries(values).forEach(([key, value]) =>
        handleInputChange({target: {name: key, value}}),
      );

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
          <div className="flex flex-col p-4 gap-4 bg-white w-[400px] *:flex *:flex-col space-y-5">
            <FormField
              label="Nimi"
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <FormField
              label="Nimi englanniksi"
              name="name_en"
              value={inputs.name_en}
              onChange={handleInputChange}
            />
            <FormField
              label="Kuvaus"
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
            />
            <FormField
              label="Kuvaus englanniksi"
              name="description_en"
              value={inputs.description_en}
              onChange={handleInputChange}
            />
            <FormField
              label="Ainesosat"
              name="ingredients"
              value={inputs.ingredients}
              onChange={handleInputChange}
            />
            <FormField
              label="Hinta (€)"
              name="price"
              value={inputs.price}
              onChange={handleInputChange}
            />

            <CategorySelector
              value={inputs.category_id}
              onChange={handleInputChange}
            />

            <SpiceLevelSelector
              level={inputs.spice_level}
              allowsCustom={inputs.allows_spice_custom}
              onLevelChange={handleInputChange}
              onCustomChange={(e) =>
                handleInputChange({
                  target: {
                    name: 'allows_spice_custom',
                    value: e.target.checked,
                  },
                })
              }
            />

            <ProteinSelector
              selected={inputs.available_proteins}
              defaultProtein={inputs.default_protein}
              onChange={(updatedProteins) =>
                handleInputChange({
                  target: {name: 'available_proteins', value: updatedProteins},
                })
              }
              onDefaultChange={(default_protein) =>
                handleInputChange({
                  target: {name: 'default_protein', value: default_protein},
                })
              }
            />

            <AllergenSelector
              allergens={allergens}
              selected={selectedAllergens}
              onChange={setSelectedAllergens}
            />

            <AvailabilityToggle
              name="is_available"
              value={inputs.is_available}
              onChange={handleInputChange}
            />

            <ImageUploadPreview
              imageFile={imageFile}
              onFileChange={(e) => setImageFile(e.target.files[0])}
              onCancel={() => setImageFile(null)}
              currentImageUrl={
                selectedItem?.image_thumb_url
                  ? `${API_UPLOADS_URL}/${selectedItem.image_thumb_url}`
                  : null
              }
            />

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
