import {createContext, useContext, useState} from 'react';
import { useAuthentication, useUser } from '../hooks/apiHook';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken, editUser, deleteUser} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const userInfo = await postLogin(credentials);
      setUser(userInfo.user);
      localStorage.setItem('token', userInfo.token);

      navigate('/profile');

    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.clear();

      setUser(null);

      navigate('/');
      console.log('logging out...')
    } catch (e) {
      console.log(e.message);
    }
  };


  const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userResult = await getUserByToken(token);
                setUser(userResult.user);
                navigate(location.pathname);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleEditedUser = async (inputs) => {
      try {
        const token = localStorage.getItem('token');
        const response = await editUser(inputs, user.user_id, token);
        console.log(response.message);
        setUser(response.result);
      } catch (error) {
        console.error(error) 
      }
    }

    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await deleteUser(user.user_id, token);
        console.log(response.message);

      } catch (error) {
        console.error(error) 
      }
    }

  return (
    <UserContext.Provider value={{handleLogin, handleLogout, handleAutoLogin, handleEditedUser, handleDelete, user}}>
      {children}
    </UserContext.Provider>
  );
};

export {  UserProvider, UserContext};