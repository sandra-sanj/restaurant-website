import useForm from '../../hooks/formHooks';
import {useLanguage} from '../../hooks/useLanguage';
import {useUser} from '../../hooks/apiHook';
import {useUserContext} from '../../hooks/contextHook';

const EditForm = () => {
  const {user, handleEditedUser} = useUserContext();
  const {strings} = useLanguage();

  const initValues = {
    username: user.username,
    email: user.email,
    phone: user.phone,
  };

  const doEdit = () => {
    try {
      inputs.role = user.role;
      inputs.is_active = user.is_active;
      console.log('userinfo: ', inputs);
      handleEditedUser(inputs);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doEdit, initValues);

  return (
    <div className='m-5'>
    <h1 className='max-sm:text-4xl!'>{strings.auth.editTitle}</h1>
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
        <label className="flex flex-col gap-1">
          {strings.auth.username}:
          <input
            name="username"
            placeholder={user.username}
            type="text"
            id="EditUser"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </label>

        <label className="flex flex-col gap-1">
          {strings.auth.email}:
          <input
            name="email"
            placeholder={user.email}
            type="email"
            id="EditEmail"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </label>

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

        <label className="flex flex-col gap-1">
          {strings.auth.phoneFormat}:
          <input
            name="phone"
            placeholder={user.phone}
            type="text"
            id="EditPhone"
            className="bg-stone-100 w-full p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </label>

        <div className='w-full'>
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
