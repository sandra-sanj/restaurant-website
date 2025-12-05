import { useState, useEffect } from 'react';
import { fetchData } from "../utils/fetchData";
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;


function useMenu() {
  const [menuArray, setMenuArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        setLoading(true);
        const options = {
          method: 'GET',
        };
        const menu = await fetchData(`${API_URL}/menu`, options);
        console.log('menu:', menu);
        setMenuArray(menu);
        setError(null);
      } catch (e) {
        console.error('Error fetching menu:', e);
        setError('Error fetching menu');
        setMenuArray([]);
      } finally {
        setLoading(false);
      }
    };
    getMenuItems();
  }, []);

  const addMenuItem = async (itemData, token) => {
    
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },

        body: JSON.stringify({itemData}),
      };

      // Post the data (new item) to API
      const newItemResponse = await fetchData(`${API_URL}/menu`, options);
      //const newItemResponse = await fetch(`${API_URL}/menu`, options);

      console.log('new item:', newItemResponse);

      return newItemResponse; // palauta response

    } catch (e) {
      console.error('Error adding item:', e);
      //setMenuArray([]);
    } finally {
      setLoading(false);
    }
    
  };

  return {menuArray, loading, error, addMenuItem};
}

function useAuthentication() {
    try{
        const postLogin = async (inputs) => {
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            };
            const loginResult = await fetchData(`${API_URL}/auth/login`, options); 
            console.log(loginResult.token);
            return loginResult;
            };
            return {postLogin};
        }catch(error){
            console.error(error);
        }    
};

function useUser() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
        const getUserByToken = async (token) => {
            try {
                setLoading(true);
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }

                const result = await fetchData(`${API_URL}/auth/me`, options);
                setError(null);
            }catch(error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

   
    const postUser = async (inputs) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            }

            const result = await fetchData(`${API_URL}/users`, options);
            console.log('testi', result.message);
            setError(null);
            navigate('/login/login');
            return;
        
    } catch(error) {
        console.error('error: ', error.message);
        setError('luonti epäonnistui');
        return error;
    }};
    return {getUserByToken, postUser};
};

export {useMenu, useAuthentication, useUser};
