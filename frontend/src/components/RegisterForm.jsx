import useForm from "../hooks/formHooks";

const LoginForm = () => {

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
             <h1>Login</h1>
             <form onSubmit={ () => {handleSubmit} }>
                  <div>
                      <label htmlFor="loginuser">Username</label>
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
                      <label htmlFor="loginuser">Username</label>
                     <input
                         name="username"
                         type="text"
                         id="registerUser"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <div>
                      <label htmlFor="loginuser">Username</label>
                     <input
                         name="username"
                         type="text"
                         id="registerUser"
                         onChange={ () => {handleInputChange} }
                     />
                 </div>
                 <button type="submit">Login</button>
             </form>
         </>
     );
};

export default LoginForm;