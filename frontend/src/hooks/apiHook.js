import { useState, useEffect } from 'react';
import { fetchData } from "../utils/fetchData";

const API_URL = import.meta.env.VITE_API_URL;

function useMenu() {
    const [menuArray, setMenuArray] = useState([]);
    

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const options = {
                    method: 'GET',
                }
                const menu = await fetchData(`${API_URL}/menu`, options)
                console.log('Menu data:', menu);
                setMenuArray(menu);
            } catch (e) {
                console.error('Error fetching menu:', e);
                setMenuArray([]);
            }
        };
        getMenuItems();
    }, []);

    return menuArray ;
}


function useAuthentication() {
    try{
        const postLogin = async (inputs) => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            };
            const loginResult = await fetchData(`${API_URL}/auth/login`, fetchOptions); 
            return loginResult;
            };
            return {postLogin};
        }catch(error){
            console.error(error);
        }    
};

function useUser() {
    try {
        const getUserByToken = async (token) => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }

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
            }

            const tokenResult = await fetchData(`${API_URL}/users`, postOptions);
            return tokenResult;
        }

        return {getUserByToken, postUser};
    }catch(error) {
        console.error(error);
    }
};

export {useMenu, useAuthentication, useUser};