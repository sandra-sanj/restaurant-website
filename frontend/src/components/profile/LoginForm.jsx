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
    <>
      <h1>{strings.auth.loginTitle}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="loginuser">{strings.auth.username}: </label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">{strings.auth.password}: </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">{strings.auth.loginButton}</button>
      </form>
    </>
  );
};

export default LoginForm;
