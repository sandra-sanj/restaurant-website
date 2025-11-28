
function useAuthentication(params) {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };
        const loginResult = await fetchData(); //tähä api
        return loginResult;
        };
    
};
