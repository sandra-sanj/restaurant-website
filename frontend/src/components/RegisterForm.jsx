import useForm from "../hooks/formHooks";

const RegisterForm = () => {

    const initValues = {
    username: '',
    password: '',
    };

    const doLogin = () => {
    console.log(inputs);
    postLogin(inputs);
    };

    const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

    console.log(inputs);
     return (
         <>
             <h1>Register</h1>
             <form onSubmit={ () => {handleSubmit} }>
                  <div>
                      <label htmlFor="registerUser">Username</label>
                     <input
                         name="username"
                         type="text"
                         id="registerUser"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <div>
                     <label htmlFor="registerPassword">Password</label>
                      <input
                         name="password"
                         type="password"
                         id="registerPassword"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <div>
                      <label htmlFor="loginuser">Email</label>
                     <input
                         name="username"
                         type="text"
                         id="registerEmail"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <div>
                      <label htmlFor="registerAddress">Address</label>
                     <input
                         name="username"
                         type="text"
                         id="registerAddress"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <button type="submit">Register</button>
             </form>
         </>
     );
};

export default RegisterForm;