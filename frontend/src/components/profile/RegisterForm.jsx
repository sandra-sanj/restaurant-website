import useForm from '../../hooks/formHooks';
import {useLanguage} from '../../hooks/useLanguage';
import {useUser} from '../../hooks/apiHook';
import {useState} from 'react';

const RegisterForm = () => {
  const {strings} = useLanguage();
  const {postUser} = useUser();
  const [errors, setErrors] = useState({});

  const initValues = {
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  };

  const doRegister = async () => {
    setErrors({});

    try {
      // remove empty optional fields
      const userData = {...inputs};
      if (!userData.phone) delete userData.phone;
      if (!userData.address) delete userData.address;

      console.log('Sending registration data:', userData);
      await postUser(userData);
    } catch (err) {
      console.error('doRegister caught error:', err);
      console.error('Error.errors:', err.errors);

      if (err.errors) {
        console.log('Setting field errors:', err.errors);
        setErrors(err.errors);
      } else {
        setErrors({general: err.message || 'Registration failed'});
      }
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div>
      <h1 className="mb-8 mt-5 text-center max-sm:text-4xl!">
        {strings.auth.registerTitle}
      </h1>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="bg-[#FFFFFF] px-5 py-8 sm:px-10 sm:py-15 flex flex-col gap-8 w-300px sm:w-[500px] border border-stone-300 rounded-md">
            <div className="flex flex-col xs:flex-row items-start w-full min-w-[300px]">
              <label htmlFor="registerUser" className="xs:text-left xs:mr-12">
                {strings.auth.username}*:{' '}
              </label>
              <div className="flex flex-col w-full">
                <input
                  name="username"
                  type="text"
                  id="registerUser"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full"
                />
                {errors.username && (
                  <p className="text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col xs:flex-row items-start w-full">
              <label
                htmlFor="registerEmail"
                className="xs:text-left xs:mr-14.5"
              >
                {strings.auth.email}*:{' '}
              </label>
              <div className="flex flex-col w-full">
                <input
                  name="email"
                  type="text"
                  id="registerEmail"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full"
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="flex flex-col xs:flex-row items-start w-full">
              <label
                htmlFor="registerPassword"
                className="xs:text-left xs:mr-19"
              >
                {strings.auth.password}*:{' '}
              </label>
              <div className="flex flex-col w-full">
                <input
                  name="password"
                  type="password"
                  id="registerPassword"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col xs:flex-row items-start w-full">
              <label htmlFor="registerPhone" className="xs:text-left sm:mr-0">
                {strings.auth.phoneFormat}:{' '}
              </label>
              <div className="flex flex-col w-full">
                <input
                  name="phone"
                  type="text"
                  id="registerPhone"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full"
                />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="flex flex-col xs:flex-row items-start w-full">
              <label
                htmlFor="registerAddress"
                className="xs:text-left sm:mr-19"
              >
                {strings.auth.address}:{' '}
              </label>
              <div className="flex flex-col w-full">
                <input
                  name="address"
                  type="text"
                  id="registerAddress"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full"
                />
              </div>
              {errors.address && (
                <p className="text-red-600">{errors.address}</p>
              )}
            </div>
          </div>

          {errors.general && <p className="text-red-600">{errors.general}</p>}
          <button
            type="submit"
            className="mt-4 bg-[#982A2A]! text-white hover:bg-[#982A2a90]! py-2 rounded"
          >
            {strings.auth.registerButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
