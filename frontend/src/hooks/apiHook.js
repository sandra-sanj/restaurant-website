import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import {useNavigate} from 'react-router';

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
        const response = await fetchData(`${API_URL}/menu`, options);
        //console.log('menu:', response);
        setMenuArray(response.result);
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

  const addMenuItem = async (formData, token) => {
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },

        //body: JSON.stringify(itemData),
        body: formData,
      };

      // Post the data (new item) to API
      const newItemResponse = await fetchData(`${API_URL}/menu`, options);
      //const newItemResponse = await fetch(`${API_URL}/menu`, options);

      console.log('new item:', newItemResponse);

      return newItemResponse; // palauta response
    } catch (e) {
      console.error('Error adding item:', e);
      throw e;
      //setMenuArray([]);
    } finally {
      setLoading(false);
    }
  };

  const modifyMenuItem = async (item, token) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },

        body: JSON.stringify(item),
      };

      const modifyResponse = await fetchData(
        `${API_URL}/menu/${item.menu_item_id}`,
        options,
      );

      return modifyResponse;
    } catch (e) {
      console.error('Modify item failed:', e);
    }
  };

  const deleteMenuItem = async (item, token) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },

        body: JSON.stringify({item}),
      };

      const deleteResponse = await fetchData(
        `${API_URL}/menu/${item.menu_item_id}`,
        options,
      );
      console.log('del.response:', deleteResponse);

      return deleteResponse;
    } catch (error) {
      console.error('Delete item failed: ', error);
    }
  };

  return {
    menuArray,
    loading,
    error,
    addMenuItem,
    modifyMenuItem,
    deleteMenuItem,
  };
}

function useOrder() {
  const postNewOrder = async ({order}) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      };
      const loginResult = await fetchData(`${API_URL}/orders`, options);
      console.log(loginResult);
    } catch (e) {
      console.error(e);
    }
  };
  return {postNewOrder};
}

function useAuthentication() {
  try {
    const postLogin = async (inputs) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(`${API_URL}/auth/login`, options);
      return loginResult;
    };
    return {postLogin};
  } catch (error) {
    console.error(error);
  }
}

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
      };

      const result = await fetchData(`${API_URL}/auth/me`, options);
      setError(null);
      return result;
    } catch (error) {
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
      };

      const result = await fetchData(`${API_URL}/users`, options);
      console.log('testi', result.message);
      setError(null);
      navigate('/login/login');
      return;
    } catch (error) {
      console.error('error: ', error.message);
      setError('luonti epäonnistui');
      return error;
    }
  };

  const editUser = async (inputs, id, token) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(inputs),
      };

      const result = await fetchData(`${API_URL}/users/${id}`, options);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, token) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const result = await fetchData(`${API_URL}/users/${id}`, options);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {getUserByToken, postUser, editUser, deleteUser};
}

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        const options = {
          method: 'GET',
        };

        const response = await fetchData(`${API_URL}/weather`, options);
        setWeather(response);
        setError(null);
      } catch (e) {
        console.error('Error fetching weather:', e);
        setError('Säätietojen lataus epäonnistui');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);

  return {weather, loading, error};
}

export {useMenu, useAuthentication, useUser, useWeather};
