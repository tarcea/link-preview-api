import { useState, useEffect } from 'react';
  
const  useFetchBookmarks = (url) => {
  const [bookmarks, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

//   const url = '/api/bookmarks/';

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const resp= await fetch(url);
            const data = await resp.json();
            setData(data);
        } catch (e) {
            setData([]);
            setError(e);
        }
        setIsLoading(false);
    }

    fetchData();
}, []);
return { bookmarks, error, isLoading }
}

export default useFetchBookmarks;