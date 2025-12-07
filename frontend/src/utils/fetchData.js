const fetchData = async (url, options = {}) => {
    const res = await fetch(url, options);
    
    if(!res.ok) {
        const error = new Error('error');
        throw error;
    }
    const data = await res.json();  // change response to JSON

    return data;
};

export {fetchData};
