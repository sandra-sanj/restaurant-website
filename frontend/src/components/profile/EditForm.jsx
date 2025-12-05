import useForm from '../../hooks/formHooks';
import { useUser } from '../../hooks/apiHook';
import { useUserContext } from '../../hooks/contextHook';

const EditForm = () => {

    const { user, handleEditedUser } = useUserContext();

    const initValues = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    };

    const doEdit = () => {
        try {
            inputs.role = user.role;
            inputs.is_active = user.is_active;
            console.log('userinfo: ', inputs );
            handleEditedUser(inputs);


        } catch (error) {
            console.log(error);
        }
        return;
    };

    //const { postUser } = useUser();

    const {inputs, handleInputChange, handleSubmit} = useForm(doEdit, initValues);

     return (
         <>
            <h2> Muokkaa käyttäjää </h2>
            <form onSubmit={ (e) => {handleSubmit(e)} }>
                <div>
                    <label htmlFor="EditUser">Käyttäjänimi: </label>
                    <input
                        name="username"
                        placeholder={user.username}
                        type="text"
                        id="EditUser"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <div>
                    <label htmlFor="EditEmail">Sähköposti: </label>
                    <input
                        name="email"
                        placeholder={user.email}
                        type="text"
                        id="EditEmail"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                {
                //    <div>
                //    <label htmlFor="EditPassword">Salasana: </label>
                //    <input
                //        name="password"
                //        type="password"
                //        id="EditPassword"
                //        onChange={ (e) => {handleInputChange(e)} }
                //    />
                //</div> 
                }
                <div>
                    <label htmlFor="EditPhone">Puhelinnumero (muoto +358): </label>
                    <input
                        name="phone"
                        placeholder={user.phone}
                        type="text"
                        id="EditPhone"
                        onChange={ (e) => {handleInputChange(e)} }
                    />
                </div>
                <button type="submit">Tallenna</button>
            </form>
        </>
    );
};

export default EditForm;