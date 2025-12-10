import useForm from '../../hooks/formHooks';
import {useLanguage} from '../../hooks/useLanguage';
import {useUser} from '../../hooks/apiHook';

const RegisterForm = () => {
  const {strings} = useLanguage();
  const {postUser} = useUser();

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
      <h1 className='mb-8 mt-5 text-center max-sm:text-4xl!'>{strings.auth.registerTitle}</h1>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='bg-[#FFFFFF] px-5 py-8 sm:px-10 sm:py-15 flex flex-col gap-8 w-300px sm:w-[500px] border border-stone-300 rounded-md'>
            <div className='flex flex-col xs:flex-row items-start w-full min-w-[300px]'>
              <label htmlFor="registerUser" className="xs:text-left xs:mr-12">{strings.auth.username}: </label>
              <input
                name="username"
                type="text"
                id="registerUser"
                onChange={(e) => {
              handleInputChange(e);
            }}
                className='w-full'
              />
            </div>
            <div className='flex flex-col xs:flex-row items-start w-full'>
              <label htmlFor="registerEmail" className="xs:text-left xs:mr-14.5">{strings.auth.email}: </label>
              <input
                name="email"
                type="text"
                id="registerEmail"
                onChange={(e) => {
              handleInputChange(e);
            }}
                className='w-full'
              />
            </div>
            <div className='flex flex-col xs:flex-row items-start w-full'>
              <label htmlFor="registerPassword" className="xs:text-left xs:mr-19">{strings.auth.password}: </label>
              <input
                name="password"
                type="password"
                id="registerPassword"
                onChange={(e) => {
              handleInputChange(e);
            }}
                className='w-full'
              />
            </div>
            <div className='flex flex-col xs:flex-row items-start w-full'>
              <label htmlFor="registerPhone" className="xs:text-left sm:mr-0">{strings.auth.phoneFormat}: </label>
              <input
                name="phone"
                type="text"
                id="registerPhone"
                onChange={(e) => {
              handleInputChange(e);
            }}
                className='w-full'
              />
            </div>
          </div>
          <button type="submit" className='mt-4 bg-[#982A2A]! text-white hover:bg-[#982A2a90]! py-2 rounded'>
            {strings.auth.registerButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
