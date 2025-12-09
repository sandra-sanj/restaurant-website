import useForm from '../../hooks/formHooks';
import { useUser } from '../../hooks/apiHook';

const RegisterForm = () => {
  const { postUser } = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
    phone: '',
  };

  const doRegister = () => {
    try {
      inputs.role = 'customer';
      inputs.is_active = 1;
      const userInfo = postUser(inputs);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <div>
      <h1 className='mb-8 mt-5'>Rekisteröidy</h1>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='bg-[#FFFFFF] px-10 py-15 flex flex-col gap-8 w-[500px] border border-stone-300 rounded-md'>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="registerUser" className="text-left mr-12">Käyttäjänimi: </label>
              <input
                name="username"
                type="text"
                id="registerUser"
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="registerEmail" className="text-left mr-14.5">Sähköposti: </label>
              <input
                name="email"
                type="text"
                id="registerEmail"
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="registerPassword" className="text-left mr-19">Salasana: </label>
              <input
                name="password"
                type="password"
                id="registerPassword"
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="registerPhone" className="text-left mr-0">Puhelinnumero (muoto +358): </label>
              <input
                name="phone"
                type="text"
                id="registerPhone"
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
          </div>
          <button type="submit" className='mt-4 bg-[#982A2A]! text-white hover:bg-[#982A2a90]! py-2 rounded'>
            Luo käyttäjä
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
