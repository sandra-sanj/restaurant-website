import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

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

  const addMenuItem = async (itemData, inputs) => { //, token) => {
    // itemData is additional info, inputs = form fields
    
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: 'Bearer ' + token,
        },

        body: JSON.stringify({...inputs, ...itemData}),
      };

      // Post the data (new item) to API
      const newItemResponse = await fetchData(`${API_URL}/menu`, options);
      console.log('new item:', newItemResponse);
      //setMenuArray(menu);
      setError(null);
    } catch (e) {
      console.error('Error adding item:', e);
      setError('Error adding item');
      //setMenuArray([]);
    } finally {
      setLoading(false);
    }
  };

  return {menuArray, loading, error, addMenuItem};
}

function useAuthentication() {
  try {
    const postLogin = async (inputs) => {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(
        `${API_URL}/auth/login`,
        fetchOptions,
      );
      return loginResult;
    };
    return {postLogin};
  } catch (error) {
    console.error(error);
  }
}

function useUser() {
  try {
    const getUserByToken = async (token) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const tokenResult = await fetchData(`${API_URL}/auth/me`, options);
      return tokenResult;
    };

    const postUser = async (inputs) => {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };

      const tokenResult = await fetchData(`${API_URL}/users`, postOptions);
      return tokenResult;
    };

    return {getUserByToken, postUser};
  } catch (error) {
    console.error(error);
  }
}

export {useMenu, useAuthentication, useUser};
