import useAuthentication from "../hooks/formHooks";

const LoginForm = () => {

    const initValues = {
    username: '',
    password: '',
    };

    //TODO: lisää doRegister joka kutsuu useAuth hookkia

    const doLogin = () => {
        console.log(inputs);
        postLogin(inputs); //fixaaa
    };

    const {postLogin} = useAuthentication();

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
                         id="loginuser"
                         onChange={ () => {handleInputChange} }
                         autoComplete="username"
                     />
                 </div>
                 <div>
                     <label htmlFor="loginpassword">Password</label>
                      <input
                         name="password"
                         type="password"
                         id="loginpassword"
                         onChange={ () => {handleInputChange} }
                         autoComplete="current-password"
                     />
                 </div>
                 <button type="submit">Login</button>
             </form>
         </>
     );
};

export default LoginForm;