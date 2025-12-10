import {useUserContext} from '../../hooks/contextHook';
import {useLanguage} from '../../hooks/useLanguage';
import useForm from '../../hooks/formHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const {strings} = useLanguage();

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
      <h1 className="mb-8 text-center max-sm:text-4xl!">{strings.auth.loginTitle}</h1>
      <div className="flex flex-col items-center w-full gap-2 sm:gap-4 min-w-[300px] sm:max-w-[400px] mx-auto">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="bg-white px-4 py-6 sm:px-10 sm:py-15 flex flex-col gap-8 border border-stone-300! rounded-md items-center">
            <div className="flex flex-col xs:flex-row items-start w-full">
              <label htmlFor="loginuser" className="text-left mr-4">
                {strings.auth.username}:{' '}
              </label>
              <input
                name="username"
                type="text"
                id="loginuser"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                autoComplete="username"
                className="w-full"
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start w-full">
              <label htmlFor="loginpassword" className="text-left mr-10">
                {strings.auth.password}:{' '}
              </label>
              <input
                name="password"
                type="password"
                id="loginpassword"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                autoComplete="current-password"
                className="w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#982A2A]! text-white hover:bg-[#982A2a90]!"
          >
            {strings.auth.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
