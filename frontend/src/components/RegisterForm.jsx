import useForm from "../hooks/formHooks";

const RegisterForm = () => {

    const initValues = {
    username: '',
    password: '',
    email: '',
    address: '',
    };

    const doLogin = () => {
    //console.log(inputs);
    postLogin(inputs);
    };

    const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

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
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="registerPassword">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="registerPassword"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="loginuser">Email</label>
                    <input
                        name="email"
                        type="text"
                        id="registerEmail"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="registerAddress">Address</label>
                    <input
                        name="address"
                        type="text"
                        id="registerAddress"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default RegisterForm;