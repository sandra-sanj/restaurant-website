import useForm from '../../hooks/formHooks';
import {useLanguage} from '../../hooks/useLanguage';
import {useUser} from '../../hooks/apiHook';
import {useUserContext} from '../../hooks/contextHook';
import {useState} from 'react';

const EditForm = () => {
  const {user, handleEditedUser} = useUserContext();
  const {strings} = useLanguage();
  const [errors, setErrors] = useState({});

  const initValues = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };

  console.log(initValues);

  const doEdit = async () => {
    setErrors({});

    try {
      const modifiedFields = {};

      Object.keys(inputs).forEach((key) => {
        const value = inputs[key];
        if (value !== initValues[key] && value !== undefined) {
          modifiedFields[key] = value;
        }
      });

      console.log('modifiedFields: ', modifiedFields);
      await handleEditedUser(modifiedFields);
    } catch (err) {
      console.error('doEdit caught error:', err);
      console.error('Error.errors:', err.errors);

      if (err.errors) {
        console.log('Setting field errors:', err.errors);
        setErrors(err.errors);
      } else {
        setErrors({general: err.message || 'Update failed'});
      }
    }
    return;
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doEdit, initValues);

  return (
    <div className="m-5">
      <h1 className="max-sm:text-4xl!">{strings.auth.editTitle}</h1>
      {/*<form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >*/}

      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        {/* Header */}
        <div>
          {/*}
        <span
            className="cursor-pointer font-bold text-lg hover:text-gray-400"
            onClick={onClose}
          >
            &times;
          </span>
          */}
        </div>

        {/* Form */}
        <div className="flex flex-col p-4 mt-7 gap-4 bg-white w-full max-w-[400px] min-w-[300px] mx-auto">
          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-1">
              {strings.auth.username}:
              <input
                name="username"
                value={inputs.username}
                placeholder={user.username}
                type="text"
                id="EditUser"
                className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.username && (
                <p className="text-red-600">{errors.username}</p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-1">
              {strings.auth.email}:
              <input
                name="email"
                value={inputs.email}
                placeholder={user.email}
                type="email"
                id="EditEmail"
                className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </label>
          </div>

          {/* 
        <label className="flex flex-col gap-1">
          Salasana:
          <input
            name="password"
            type="password"
            id="EditPassword"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </label>
        */}
          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-1">
              {strings.auth.phoneFormat}:
              <input
                name="phone"
                value={inputs.phone}
                placeholder={user.phone}
                type="text"
                id="EditPhone"
                className="bg-stone-100 w-full p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  handleInputChange({target: {name: 'phone', value: ''}})
                }
                className="px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300"
              >
                Clear
              </button>
              {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex flex-col gap-1">
              {strings.auth.address}:
              <input
                name="address"
                value={inputs.address}
                placeholder={user.address}
                type="text"
                id="EditAddress"
                className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errors.address && (
                <p className="text-red-600">{errors.address}</p>
              )}
            </label>
          </div>

          <div className="w-full">
            {errors.general && <p className="text-red-600">{errors.general}</p>}
            <button
              type="submit"
              className="bg-[#982a2a33]! border-2! border-[#982A2A]! text-black py-2 rounded hover:opacity-90 mt-4 hover:bg-[#982a2a70]!"
              onClick={handleSubmit}
            >
              {strings.auth.saveButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
