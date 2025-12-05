const fetchData = async (url, options = {}) => {
    const res = await fetch(url, options);
    
    if(!res.ok) {
        const error = new Error('error');
        //error.status = res.status;
        throw error;
    }
    //const response = await res.json();

    return res;
};

export {fetchData};
