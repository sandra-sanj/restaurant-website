import useForm from '../../hooks/formHooks';
import { useUser } from '../../hooks/apiHook';

const RegisterForm = () => {

    const initValues = {
    username: '',
    password: '',
    email: '',
    address: '',
    };

    const doRegister = () => {
    console.log(inputs);
    postUser(inputs);
    };

    const {postUser} = useUser();

    const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, initValues);

     return (
         <>
            <h1> Luo käyttäjä</h1>
            <form onSubmit={ () => {handleSubmit} }>
                <div>
                    <label htmlFor="registerUser">Käyttäjänimi: </label>
                    <input
                        name="username"
                        type="text"
                        id="registerUser"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="registerPassword">Salasana: </label>
                    <input
                        name="password"
                        type="password"
                        id="registerPassword"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="registerEmail">Sähköposti: </label>
                    <input
                        name="email"
                        type="text"
                        id="registerEmail"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="registerAddress">Osoite: </label>
                    <input
                        name="address"
                        type="text"
                        id="registerAddress"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <button type="submit">Luo käyttäjä</button>
            </form>
        </>
    );
};

export default RegisterForm;