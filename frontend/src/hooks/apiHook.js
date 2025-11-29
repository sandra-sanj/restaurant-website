
function useAuthentication() {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        const loginResult = await fetchData('/users'); 
        return loginResult;
        };
    return {postLogin};
};

const useUser = () => {
    const getUserByToken = async (token) => {
        const options = {
            headers: {
                Authorization: 'Bearer' + token,
            },
        };

        const tokenResult = fetchData();
        return tokenResult;
    }
}

export {useAuthentication};