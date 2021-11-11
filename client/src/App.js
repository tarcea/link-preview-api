import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import BookmarkList from './BookmarkList';
import InputForm from './InputForm';

const  App = () => {
  const [message, setMessage] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const result = await axios.get('/api/bookmarks/');
      setBookmarks(result.data)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchBookmarks();
  },[]);

  const deleteBookmark = async (id) => {
    setMessage('bookmark deleted')
    await axios.delete(`/api/bookmarks/${id}`);
    await fetchBookmarks();
    console.log(id, 'deleted')
  };

  return (
    <div className="App">
      <InputForm setMessage={setMessage} fetchBookmarks={fetchBookmarks} />
      <BookmarkList setMessage={setMessage} bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
      <p>{message}</p>
    </div>
  );
}

export default App;
