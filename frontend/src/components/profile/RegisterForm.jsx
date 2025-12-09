import useForm from '../../hooks/formHooks';
import {useLanguage} from '../../hooks/useLanguage';
import {useUser} from '../../hooks/apiHook';

const RegisterForm = () => {
  const {strings} = useLanguage();

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

  const {postUser} = useUser();

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>{strings.auth.registerTitle}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="registerUser">{strings.auth.username}: </label>
          <input
            name="username"
            type="text"
            id="registerUser"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="registerEmail">{strings.auth.email}: </label>
          <input
            name="email"
            type="text"
            id="registerEmail"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="registerPassword">{strings.auth.password}: </label>
          <input
            name="password"
            type="password"
            id="registerPassword"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="registerPhone">{strings.auth.phoneFormat}: </label>
          <input
            name="phone"
            type="text"
            id="registerPhone"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <button type="submit">{strings.auth.registerButton}</button>
      </form>
    </>
  );
};

export default RegisterForm;
