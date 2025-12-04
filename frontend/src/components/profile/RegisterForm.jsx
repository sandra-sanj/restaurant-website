import useForm from '../../hooks/formHooks';
import { useUser } from '../../hooks/apiHook';

const RegisterForm = () => {

    const initValues = {
    username: '',
    password: '',
    email: '',
    phone: '',
    };

    const doRegister = () => {
        try {
            console.log(inputs);
            const userInfo = postUser(inputs);
            console.log(userInfo);

        } catch (error) {
            console.log(error);
        }
    };

    const {postUser} = useUser();

    const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, initValues);

     return (
         <>
            <h1> Luo käyttäjä</h1>
            <form onSubmit={ (e) => {handleSubmit(e)} }>
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
                    <label htmlFor="registerEmail">Sähköposti: </label>
                    <input
                        name="email"
                        type="text"
                        id="registerEmail"
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
                    <label htmlFor="registerPhone">Puhelinnumero (muoto +358): </label>
                    <input
                        name="phone"
                        type="text"
                        id="registerPhone"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <button type="submit">Luo käyttäjä</button>
            </form>
        </>
    );
};

export default RegisterForm;