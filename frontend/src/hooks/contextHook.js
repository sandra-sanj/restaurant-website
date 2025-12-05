import {useContext} from 'react';
import { UserContext } from '../context/UserContext';

const useUserContext = () => {
    const context = useContext(UserContext);
    console.log(context);
    if (!context) {
        throw new Error('error with userContext');
    }

    return context;
};

export { useUserContext };