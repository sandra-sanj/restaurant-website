import useForm from '../../hooks/formHooks';
import {useUserContext} from '../../hooks/contextHook';

const EditForm = () => {
  const {user, handleEditedUser} = useUserContext();

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
    <div className="m-5 outline-2 outline-gray-400 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center text-white p-4 rounded-t-md bg-[#982A2A]!">
        <p className="font-bold">Muokkaa käyttäjää</p>
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
      <div className="flex flex-col p-4 gap-4 bg-white w-[400px]">
        <label className="flex flex-col gap-1">
          Käyttäjänimi:
          <input
            name="username"
            placeholder={user.username}
            type="text"
            id="EditUser"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={handleInputChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          Sähköposti:
          <input
            name="email"
            placeholder={user.email}
            type="email"
            id="EditEmail"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </label>
        */}

        <label className="flex flex-col gap-1">
          Puhelinnumero (muoto +358):
          <input
            name="phone"
            placeholder={user.phone}
            type="text"
            id="EditPhone"
            className="bg-stone-100 p-1 rounded focus:bg-[#982a2a33] focus:border-[#982A2A]!"
            onChange={handleInputChange}
          />
        </label>

        <div className='w-full ml-30 mr-0'>
          <button
            type="submit"
            className="bg-[#982a2a33]! border-2! border-[#982A2A]! text-black py-2 rounded hover:opacity-90 mt-4 hover:bg-[#982a2a70]!"
            onClick={handleSubmit}
          >
            Tallenna
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
