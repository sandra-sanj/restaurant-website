const fetchData = async (url, options = {}) => {
    const res = await fetch(url, options);
    const response = await res.json();
    
    if(!res.ok) {
        const error = new Error('error');
        error.status = res.status;
        throw error;
    }

    return response;
};

export {fetchData};
