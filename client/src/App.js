import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import InputForm from './components/InputForm/InputForm';
import Message from './components/Message/Message';
import Search from './components/Search/Search';

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
    setMessage('');
  },[]);
   
  const deleteBookmark = async (id) => {
    setMessage('bookmark deleted')
    await axios.delete(`/api/bookmarks/${id}`);
    await fetchBookmarks();
    console.log(id, 'deleted')
  };


  return (
    <div className="container">
      <h1 className="container__header">bookmark!t</h1>
      <InputForm 
        setMessage={setMessage} 
        fetchBookmarks={fetchBookmarks} />
      {message !== '' && (
      <Message 
        message={message} 
        setMessage={setMessage} />)}
      <Search 
        setMessage={setMessage} 
        bookmarks={bookmarks} 
        deleteBookmark={deleteBookmark} />
    </div>
  );
}

export default App;
