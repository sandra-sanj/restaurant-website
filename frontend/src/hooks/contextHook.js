import {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { OrderContext } from '../context/OrderContext';

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('error with userContext');
    }

    return context;
};


//const useOrderContext = () => {
//    const context = useContext(OrderContext);
//    if (!context) {
//        throw new Error('error with orderContext');
//    }
//    return context;
//}
//
export { useUserContext, useOrderContext };