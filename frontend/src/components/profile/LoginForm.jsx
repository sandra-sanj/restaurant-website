
import { useAuthentication } from "../../hooks/apiHook";
import useForm from "../../hooks/formHooks";

const LoginForm = () => {

    const initValues = {
    username: '',
    password: '',
    };


    const doLogin = () => {
        try {
            postLogin(inputs);
        } catch (error) {
            console.error(error);
        }
    };

    const {postLogin} = useAuthentication();

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