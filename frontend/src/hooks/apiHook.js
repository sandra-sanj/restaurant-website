
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

function useUser() {
    const getUserByToken = async (token) => {
        const options = {
            headers: {
                Authorization: 'Bearer' + token,
            },
        };

        const tokenResult = await fetchData();
        return tokenResult;
    }

    const postUser = async (inputs) => {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        }
    }

    return {getUserByToken, postUser};
}

export {useAuthentication, useUser};