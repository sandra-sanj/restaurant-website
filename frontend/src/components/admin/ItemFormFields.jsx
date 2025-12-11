import {useRef} from 'react';
import {CATEGORIES, PROTEINS, SPICE_LEVELS} from './ItemConstants.js';

export const FormField = ({label, name, value, onChange, type = 'text'}) => (
  <label>
    {label}:
    <input
      name={name}
      className="bg-stone-100 p-1 rounded"
      type={type}
      value={value}
      onChange={onChange}
    />
  </label>
);

export const CategorySelector = ({value, onChange}) => (
  <div>
    <p>Kategoria:</p>
    <select
      name="category"
      className="bg-stone-100 p-1 rounded"
      value={value}
      onChange={onChange}
    >
      {CATEGORIES.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
);

export const SpiceLevelSelector = ({
  level,
  allowsCustom,
  onLevelChange,
  onCustomChange,
}) => (
  <div>
    <p>Tulisuus:</p>
    <select
      name="spiceLevel"
      value={level}
      onChange={onLevelChange}
      className="bg-stone-100 p-1 rounded"
    >
      {SPICE_LEVELS.map((lvl) => (
        <option key={lvl} value={lvl}>
          {lvl}
        </option>
      ))}
    </select>
    <label className="flex items-center gap-1 mt-1">
      <input type="checkbox" checked={allowsCustom} onChange={onCustomChange} />
      Salli tulisuuden muokkaus
    </label>
  </div>
);

export const ProteinSelector = ({
  selected,
  defaultProtein,
  onChange,
  onDefaultChange,
}) => {
  const handleProteinToggle = (proteinId, isChecked) => {
    const updated = isChecked
      ? [...selected, proteinId]
      : selected.filter((protein) => protein !== proteinId);

    onChange(updated);

    // clear default if no longer available
    if (!updated.includes(defaultProtein)) {
      onDefaultChange('');
    }
  };

  const selectedProteinOptions = PROTEINS.filter((protein) =>
    selected.includes(protein.id),
  );

  return (
    <div>
      <p>Proteiinit:</p>
      <div className="flex flex-wrap gap-2">
        {PROTEINS.map((protein) => (
          <label key={protein.id} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected.includes(protein.id)}
              onChange={(e) =>
                handleProteinToggle(protein.id, e.target.checked)
              }
            />
            {protein.name}
          </label>
        ))}
      </div>

      <p className="mt-2">Oletusproteiini:</p>
      <select
        name="defaultProtein"
        value={defaultProtein || ''}
        onChange={(e) => onDefaultChange(e.target.value)}
        className="bg-stone-100 p-1 rounded"
      >
        <option value="">Ei valittu</option>
        {selectedProteinOptions.map((protein) => (
          <option key={protein.id} value={protein.id}>
            {protein.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const AllergenSelector = ({allergens, selected, onChange}) => (
  <div>
    <p>Ruokavaliot:</p>
    <div className="flex flex-wrap gap-2">
      {allergens?.map((allergen) => (
        <label key={allergen.allergen_id} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selected.includes(allergen.allergen_id)}
            onChange={(e) => {
              const updated = e.target.checked
                ? [...selected, allergen.allergen_id]
                : selected.filter((id) => id !== allergen.allergen_id);
              onChange(updated);
            }}
          />
          {allergen.code}
        </label>
      ))}
    </div>
  </div>
);

export const AvailabilityToggle = ({name, value, onChange}) => (
  <label className="flex items-center gap-1">
    Saatavilla:
    <input
      type="checkbox"
      name={name}
      checked={value || false}
      onChange={(e) =>
        onChange({target: {name: e.target.name, value: e.target.checked}})
      }
    />
  </label>
);

export const ImageUploadPreview = ({
  imageFile,
  onFileChange,
  onCancel,
  currentImageUrl,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="items-center">
      <p>Kuva:</p>
      <input
        type="file"
        className="bg-stone-100 p-1 rounded"
        onChange={onFileChange}
        ref={fileInputRef}
      />

      {/* Show selected new image */}
      {imageFile && (
        <>
          <button
            type="button"
            className="text-red-600 underline text-sm"
            onClick={() => {
              onCancel();
              if (fileInputRef.current) fileInputRef.current.value = null;
            }}
          >
            Peruuta
          </button>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Selected"
            className="w-24 h-24 object-cover border rounded mt-2"
          />
        </>
      )}

      {/* Show current image if no new image */}
      {!imageFile && currentImageUrl && (
        <div className="flex flex-col mt-2">
          <p>Nykyinen kuva:</p>
          <img
            src={currentImageUrl}
            alt="Current"
            className="w-24 h-24 object-cover border rounded"
          />
        </div>
      )}
    </div>
  );
};
