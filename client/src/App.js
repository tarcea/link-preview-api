import React, { useState, useEffect } from 'react';
import './App.css';
// import axios from 'axios';
import BookmarkList from './BookmarkList';
import InputForm from './InputForm';

const  App = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <InputForm setMessage={setMessage} />
      <BookmarkList setMessage={setMessage} />
      <p>{message}</p>
    </div>
  );
}

export default App;
