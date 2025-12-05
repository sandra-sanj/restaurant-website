import { useUserContext } from "../../hooks/contextHook";
import useForm from "../../hooks/formHooks";

const LoginForm = () => {
    const { handleLogin } = useUserContext();

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


    const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

     return (
         <>
             <h1>Kirjaudu sisään!</h1>
             <form onSubmit={ (e) => {handleSubmit(e)} }>
                  <div>
                      <label htmlFor="loginuser">Käyttäjänimi: </label>
                     <input
                         name="username"
                         type="text"
                         id="loginuser"
                         onChange={ (e) => {handleInputChange(e)} }
                         autoComplete="username"
                     />
                 </div>
                 <div>
                     <label htmlFor="loginpassword">Salasana: </label>
                      <input
                         name="password"
                         type="password"
                         id="loginpassword"
                         onChange={ (e) => {handleInputChange(e)} }
                         autoComplete="current-password"
                     />
                 </div>
                 <button type="submit">Kirjaudu</button>
             </form>
         </>
     );
};

export default LoginForm;