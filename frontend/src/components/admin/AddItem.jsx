import {useState} from 'react';
import {useMenu, useAllergens} from '../../hooks/apiHook.js';
import useForm from '../../hooks/formHooks.js';
import {
  FormField,
  CategorySelector,
  SpiceLevelSelector,
  ProteinSelector,
  AllergenSelector,
  AvailabilityToggle,
  ImageUploadPreview,
} from './ItemFormFields.jsx';

const AddItem = ({onClose}) => {
  const [imageFile, setImageFile] = useState(null);
  const {addMenuItem} = useMenu();
  const {allergens} = useAllergens();
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  // match values with database names
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

  const doAddItem = async (values) => {
    if (
      !values.name ||
      !values.name_en ||
      !values.description ||
      !values.description_en ||
      !values.price
    ) {
      alert('Täytä kaikki kentät!');
      return;
    }

    // Check that price is numeric
    if (isNaN(parseFloat(values.price))) {
      alert('Syötä hinta numerona, esim. 10.90 tai 10,90');
      return;
    }

    if (!imageFile) {
      alert('Kuva on pakollinen!');
      return;
    }

    const token = localStorage.getItem('token');

    const formData = new FormData();
    // add all values to formData
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'available_proteins') {
        formData.append(key, value.join(', '));
      } else if (key === 'price') {
        formData.append(key, parseFloat(value).toFixed(2));
      } else if (key === 'allows_spice_custom' || key === 'is_available') {
        formData.append(key, value ? 1 : 0);
      } else {
        formData.append(key, value);
      }
    });
    formData.append('file', imageFile);
    if (selectedAllergens.length)
      formData.append('allergen_ids', JSON.stringify(selectedAllergens));

    // Debug: Näytä FormData sisältö
    console.log('FormData sisältö:');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }

    try {
      const newItemResponse = await addMenuItem(formData, token);

      if (newItemResponse !== null && newItemResponse !== undefined) {
        alert(`Tuote "${values.name}" lisätty`);
        //onClose();
        // do not close form, reset it
        setImageFile(null);
        setSelectedAllergens([]);
        resetForm();
      } else {
        alert(`Virhe tuotteen "${values.name}" lisäämisessä`);
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
                target: {name: 'allows_spice_custom', value: e.target.checked},
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

          <div>
            <AvailabilityToggle
              name="is_available"
              value={inputs.is_available}
              onChange={handleInputChange}
            />
          </div>

          <ImageUploadPreview
            imageFile={imageFile}
            onFileChange={(e) => setImageFile(e.target.files[0])}
            onCancel={() => setImageFile(null)}
          />

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
