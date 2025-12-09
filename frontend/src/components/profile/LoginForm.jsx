import {useUserContext} from '../../hooks/contextHook';
import useForm from '../../hooks/formHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs);
    } catch (error) {
      console.error(error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div>
      <h1 className='mb-8'>Kirjaudu sisään!</h1>
      <div className="">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='bg-[#FFFFFF] px-10 py-15 flex flex-col gap-8 w-[400px] border border-stone-300! rounded-md'>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="loginuser" className="text-left mr-4">Käyttäjänimi: </label>
              <input
                name="username"
                type="text"
                id="loginuser"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                autoComplete="username"
                className='w-full'
              />
            </div>
            <div className='flex flex-row items-start w-full'>
              <label htmlFor="loginpassword" className="text-left mr-10">Salasana: </label>
              <input
                name="password"
                type="password"
                id="loginpassword"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                autoComplete="current-password"
                className='w-full'
              />
            </div>
          </div>
          <button type="submit" className='bg-[#982A2A]! text-white hover:bg-[#982A2a90]!'>Kirjaudu</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
