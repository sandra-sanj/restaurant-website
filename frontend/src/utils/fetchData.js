const fetchData = async (url, options = {}) => {
  const res = await fetch(url, options);

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.status = res.status;
    error.errors = data?.errors || null;
    throw error;
  }

  return data;
};

export {fetchData};
